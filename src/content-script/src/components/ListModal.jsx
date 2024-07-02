import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SkeletonText,
  Switch,
  useColorMode,
} from "@chakra-ui/react";
import ListContent from "./ListContent";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

import sampleData from "./sampleData.json";
import dayjs from "dayjs";
import { css } from "@emotion/react";
import { SettingsIcon, SmallCloseIcon } from "@chakra-ui/icons";

export default function ListModal({
  isOpen,
  onClose,
  buildList,
  setBuildList,
}) {
  const [filteredBuildList, setfilteredBuildList] = useState([]);
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [showUtcFormat, setShowUtcFormat] = useState(false);

  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    // Get active tab url
    chrome.runtime.sendMessage(
      { action: "getActiveTabUrl" },
      async (response) => {
        let currentTabUrl = response.url;
        const currentTabUrlArr = currentTabUrl.split("/");
        const pipelineInd = currentTabUrlArr.indexOf("job") + 1;
        currentTabUrl = currentTabUrlArr.reduce((url, str, ind) => {
          if (ind <= pipelineInd) {
            return url + str + "/";
          }
          return url;
        }, "");

        setJobTitle(currentTabUrlArr[pipelineInd]);

        if (!buildList.length) {
          setIsApiLoading(true);
          const { data } = await axios.get(
            `${currentTabUrl}api/json?tree=builds[id,result,url,timestamp,actions[parameters[name,value],causes[userName,userId],remoteUrls{0,1}]{0,7}]`
          );

          const buildListData = appendBuildDetails(data);
          setBuildList(buildListData);
          setfilteredBuildList(buildListData);
          setIsApiLoading(false);
        }
      }
    );
  }, []);

  function appendBuildDetails(data) {
    const buildWithGhLink = data.builds.find((buildItem) =>
      buildItem?.actions.find((actionItem) => actionItem?.remoteUrls)
    );
    let [ghLink] =
      buildWithGhLink?.actions?.find((actionItem) => actionItem?.remoteUrls)
        ?.remoteUrls || [];
    if (ghLink) {
      ghLink = `https://github.com/${ghLink.split(":")[1].split(".")[0]}/tree/`;
    }

    const builds = data.builds.map((buildItem) => {
      if (!buildItem.id) {
        return null;
      }

      const { actions, id, url, result, timestamp } = buildItem;
      const userDetail = actions[1];

      const parameters = actions.find(
        (actionItem) => actionItem.parameters
      )?.parameters;

      const branch =
        parameters?.find(
          (param) =>
            param.name === "BRANCH" ||
            param.name === "GIT_BRANCH" ||
            param.name === "ghprbSourceBranch"
        )?.value || "--";

      let user = parameters?.find(
        (param) => param.name === "ghprbTriggerAuthor"
      )?.value;

      if (!user) {
        user = parameters?.find(
          (param) => param.name === "ghprbPullAuthorLogin"
        )?.value;
      }

      if (!user) {
        user = userDetail.causes ? userDetail.causes[0].userName : "N/A";
      }

      return {
        id,
        url,
        result: result || "",
        timestamp,
        branch,
        user,
        ghLink: ghLink ? ghLink + branch : null,
      };
    });

    return builds.filter((build) => build);
  }

  const [branchUserStatusVal, setBranchUserStatusVal] = useState("");
  const [dateVal, setDateVal] = useState("");

  const handleInputChange = (e) => {
    if (e.target.id === "textInput") {
      setBranchUserStatusVal(e.target.value.toLowerCase());
    } else {
      setDateVal(e.target.value);
    }
  };

  const timeoutRef = useRef();

  const renderFiltered = branchUserStatusVal || dateVal;

  useEffect(() => {
    if (renderFiltered) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        let filteredData = [];

        if (branchUserStatusVal) {
          filteredData = buildList.filter((buildItem) => {
            const { result, branch, user } = buildItem;

            return (
              branch.toLowerCase().includes(branchUserStatusVal) ||
              user.toLowerCase().includes(branchUserStatusVal) ||
              result.toLowerCase().includes(branchUserStatusVal)
            );
          });
        }

        if (dateVal) {
          if (filteredData.length) {
            filteredData = filteredData.filter((buildItem) =>
              dayjs(dateVal).isSame(dayjs(buildItem.timestamp), "day")
            );
          } else {
            filteredData = buildList.filter((buildItem) =>
              dayjs(dateVal).isSame(dayjs(buildItem.timestamp), "day")
            );
          }
        }

        setfilteredBuildList(filteredData);
      }, 300);
    }
  }, [branchUserStatusVal, dateVal]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        size="xl"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent sx={{ maxWidth: "1150px", minWidth: "1150px" }}>
          <ModalHeader>Pipeline: {jobTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pt={0} pb={"20px"}>
            <Flex gap={2} mb="15px">
              <FormControl width="350px">
                <FormLabel fontSize="14px" mb={"2px"}>
                  Branch, User or Status
                </FormLabel>
                <InputGroup>
                  <Input
                    autoFocus
                    focusBorderColor="#1E8422"
                    placeholder="Filter by Branch, User or Status value"
                    id="textInput"
                    value={branchUserStatusVal}
                    onChange={handleInputChange}
                  />
                  {branchUserStatusVal.length && (
                    <InputRightElement>
                      <Button
                        sx={{
                          minW: "21px",
                          h: "21px",
                          p: "0",
                          borderRadius: "50%",
                        }}
                        onClick={() => {
                          setBranchUserStatusVal("");
                          document.querySelector("input#textInput").focus();
                        }}
                      >
                        <SmallCloseIcon />
                      </Button>
                    </InputRightElement>
                  )}
                </InputGroup>
              </FormControl>
              <FormControl width="200px">
                <FormLabel fontSize="14px" mb={"2px"}>
                  Date
                </FormLabel>
                <Input
                  css={css`
                    ::-webkit-calendar-picker-indicator {
                      bg: rgba(0,0,0,0),
                      bottom: 0,
                      color: rgba(0,0,0,0),
                      cursor: pointer,
                      height: auto,
                      left: 0,
                      position: absolute,
                      right: 0,
                      top: 0,
                      width: auto,
                    }
                  `}
                  focusBorderColor="#1E8422"
                  cursor="text"
                  size="md"
                  type="date"
                  value={dateVal}
                  onChange={handleInputChange}
                />
              </FormControl>

              <Menu
                closeOnSelect={false}
                autoSelect={false}
                placement="bottom-end"
              >
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<SettingsIcon />}
                  variant="outline"
                  ml="auto"
                />
                <MenuList>
                  <MenuItem
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <FormLabel htmlFor="dark-mode" mb="0" cursor="pointer" w='100%'>
                      Dark mode
                    </FormLabel>
                    <Switch id="dark-mode" isChecked={colorMode === "dark"} onChange={toggleColorMode} />
                  </MenuItem>
                  <MenuItem
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <FormLabel htmlFor="dark-mode" mb="0" cursor="pointer" w='100%'>
                      UTC format
                    </FormLabel>
                    <Switch id="utc-format" isChecked={showUtcFormat} onChange={() => setShowUtcFormat(!showUtcFormat)} />
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>

            {isApiLoading ? (
              <SkeletonText
                mt="4"
                noOfLines={4}
                spacing="4"
                skeletonHeight="5"
              />
            ) : (
              <ListContent
                showUtcFormat={showUtcFormat}
                buildList={renderFiltered ? filteredBuildList : buildList}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

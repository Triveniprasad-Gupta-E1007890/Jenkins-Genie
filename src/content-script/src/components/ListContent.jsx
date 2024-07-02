import {
  Badge,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export default function ListContent({ buildList = [], showUtcFormat }) {
  return (
    <TableContainer overflowX="unset" overflowY="unset">
      <Table variant="simple">
        <Thead position="sticky" top="0">
          <Tr>
            <Th>Build ID ({buildList.length})</Th>
            <Th>Branch</Th>
            <Th>User</Th>
            <Th>Date ({showUtcFormat ? "UTC" : "IST"})</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {buildList.length ? (
            buildList.map((buildItem) => {
              const { id, url, result, timestamp, branch, user, ghLink } =
                buildItem;

              const status = {
                SUCCESS: "green",
                UNSTABLE: "red",
                FAILURE: "orange",
              };

              const formatedDate = showUtcFormat
                ? dayjs(timestamp).utc().format("D MMM YYYY, HH:mm:ss")
                : dayjs(timestamp).format("D MMM YYYY, HH:mm:ss");

              return (
                <Tr key={id}>
                  <Td>
                    <Link href={url} target="_blank">
                      #{id}
                    </Link>
                  </Td>
                  <Td>
                    {branch !== "--" ? (
                      ghLink ? (
                        <Link href={ghLink} target="_blank">
                          {branch}
                        </Link>
                      ) : (
                        branch
                      )
                    ) : (
                      "N/A"
                    )}
                  </Td>
                  <Td>{user}</Td>
                  <Td>{formatedDate}</Td>
                  <Td>
                    {result ? (
                      <Badge
                        boxShadow="xs"
                        variant="solid"
                        colorScheme={status[result] || "gray"}
                      >
                        {result}
                      </Badge>
                    ) : (
                      "N/A"
                    )}
                  </Td>
                </Tr>
              );
            })
          ) : (
            <Tr>
              <Td colSpan={5}>
                <Text fontSize="2xl" textAlign="center" color="gray.500">
                  No records found
                </Text>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

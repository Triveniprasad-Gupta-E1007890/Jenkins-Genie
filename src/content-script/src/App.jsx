import { Button, useDisclosure } from "@chakra-ui/react";
import ListModal from "./components/ListModal";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [buildList, setBuildList] = useState([]);

  return (
    <div className="App">
      <Button
        m="10px"
        colorScheme="green"
        className='filter-build-btn glow-effect'
        textColor="white"
        size="sm"
        sx={{ bgColor: "green" }}
        onClick={onOpen}
      >
        Filter builds
        <svg class="glow-container">
          <rect
            pathLength="100"
            stroke-linecap="round"
            class="glow-blur"
          ></rect>
          <rect
            pathLength="100"
            stroke-linecap="round"
            class="glow-line"
          ></rect>
        </svg>
      </Button>
      {isOpen && (
        <ListModal
          isOpen={isOpen}
          onClose={onClose}
          buildList={buildList}
          setBuildList={setBuildList}
        ></ListModal>
      )}
    </div>
  );
}

export default App;

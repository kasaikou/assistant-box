// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import { invoke } from "@tauri-apps/api/tauri";
// import "./App.css";

// @ts-ignore
import Board from '@asseinfo/react-kanban';
import '@asseinfo/react-kanban/dist/styles.css';

function App() {

  return (<>
    <Board
      initialBoard={{
        columns: [
          {
            id: 0,
            title: "Backlog",
            cards: [
              {
                id: 0,
                title: "Add Canban",
                description: "react-kanban",
              }
            ]
          },
          {
            id: 1,
            title: "Developping",
            cards: [
              {
                id: 1,
                title: "Create Canban",
                description: "react-kanban",
              }
            ],
          }
        ]
      }}
      allowAddCard={{ on: "top" }}
      allowRemoveCard
      disableColumnDrag
      onNewCardConfirm={(draftCard: any) => ({
        id: new Date().getTime(),
        ...draftCard,
      })}
      onCardNew={console.log}
      onCardDragEnd={console.log}
      onCardRemove={console.log}
    />
  </>)
}

export default App;

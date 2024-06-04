import { Machine } from "./turing";

export const testMachine: Machine = {
  initialStateLabel: "SCAN_A",
  states: [
    {
      label: "SCAN_A",
      transition: {
        a: {
          write: "a",
          move: "R",
          goto: "SCAN_A",
        },
        b: {
          write: "b",
          move: "R",
          goto: "FOLLOWED_BY_2_B",
        },
        "\0": {
          write: "\0",
          move: "R",
          goto: "SUCCESS",
        },
      },
    },
    {
      label: "FOLLOWED_BY_2_B",
      transition: {
        a: {
          write: "a",
          move: "R",
          goto: "FAIL",
        },
        b: {
          write: "b",
          move: "R",
          goto: "SCAN_A",
        },
        "\0": {
          write: "\0",
          move: "R",
          goto: "SUCCESS",
        },
      },
    },
    {
      label: "SUCCESS",
      transition: {
        a: {
          write: "a",
          move: "R",
          goto: null,
        },
        b: {
          write: "b",
          move: "R",
          goto: null,
        },
        "\0": {
          write: "\0",
          move: "R",
          goto: null,
        },
      },
    },
    {
      label: "FAIL",
      transition: {
        a: {
          write: "a",
          move: "R",
          goto: null,
        },
        b: {
          write: "b",
          move: "R",
          goto: null,
        },
        "\0": {
          write: "\0",
          move: "R",
          goto: null,
        },
      },
    },
  ],
};

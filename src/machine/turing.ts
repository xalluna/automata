type TransitionFunction = {
  write: string | "\0";
  move: "L" | "R";
  goto: string | null;
};

type Transition<T> = {
  [K in keyof T]: TransitionFunction;
};

type State = {
  label: string;
  transition: Transition<any>;
};

type Machine = {
  initialStateLabel: string;
  states: State[];
};

class MachineRunner {
  private machine: Machine;
  private state: State;
  private machineAlphabet: string[];

  constructor(machine: Machine) {
    const states = machine.states;

    const stateLabelSet = new Set<string>();

    states.forEach((state) => {
      if (stateLabelSet.has(state.label)) {
        throw new InvalidConfigError("States are not unique");
      }

      stateLabelSet.add(state.label);
    });

    const initialState = states.find(
      (state) => state.label === machine.initialStateLabel
    );

    if (!initialState) {
      throw new InvalidConfigError("No initial state located");
    }

    const machineAlphabet = states.reduce((prev, curr) => {
      const keys = Object.keys(curr.transition);
      return [...prev, ...keys];
    }, [] as string[]);

    this.machine = machine;
    this.state = initialState;
    this.machineAlphabet = machineAlphabet;
  }

  public run(inputString: string) {
    let memory = inputString.split("");
    let index = 0;
    let transitionFn: TransitionFunction;
    let running = true;

    const moveLeft = () => {
      if (index === 0) {
        memory = ["\0", ...memory];
        return;
      }

      index--;
    };

    const moveRight = () => {
      if (index >= memory.length - 1) {
        memory = [...memory, "\0"];
        return;
      }

      index++;
    };

    while (running) {
      const value = memory[index];

      console.log({ index, value, state: this.state.label });

      if (!this.machineAlphabet.find((x) => x === value)) {
        throw new InvalidConfigError("Symbol not in alphabet");
      }

      transitionFn = this.state.transition[value];

      memory[index] = transitionFn.write;

      switch (transitionFn.move) {
        case "L":
          moveLeft();
          break;
        case "R":
          moveRight();
          break;
      }

      if (transitionFn.goto === null) {
        return;
      }

      const nextState = this.machine.states.find(
        (state) => state.label === transitionFn.goto
      );

      if (!nextState) {
        throw new InvalidConfigError(
          `State not in machine ${transitionFn.goto}`
        );
      }

      this.state = nextState;
    }
  }

  public getState() {
    return this.state.label;
  }
}

class InvalidConfigError extends Error {}

export { TransitionFunction, Transition, State, Machine, MachineRunner };

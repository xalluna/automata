import { testMachine } from "./machine/test-configs";
import { MachineRunner } from "./machine/turing";

const machineRunner = new MachineRunner(testMachine);

machineRunner.run("aabbababaa");
console.log(machineRunner.getState());

import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import type { Writable } from "svelte/store";

export interface InputOptions{
  leftIcon?: IconDefinition;
  leftText?:string;
  placeholder?:string;
  label: string;
  inputName: string;
}

export interface AutoInputOptions extends InputOptions{
  inputChange: {handler: (event) => Promise<void> | void, getDataList: () => Writable<unknown[]>};
  ms?: number;
  optionValue?: string;
  optionLabel: (option)=> string;
}
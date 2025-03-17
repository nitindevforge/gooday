import { ReactNode } from "react"

export type ConsentCheckboxProps = {
  title?: string | ReactNode
  onPress?: () => void;
  checked?: boolean
}
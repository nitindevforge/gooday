export type OptionsSheetProps = {
  title?: string;
  buttons: OptionsSheetPropsButton[];
  hide: () => void;
  visible: boolean;
};

export type OptionsSheetPropsButton = {
  title: string;
  onPress: () => void;
};

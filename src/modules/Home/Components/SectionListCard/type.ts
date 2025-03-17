export type SectionListCardProps = {
  data: Array<Object>;
  onPress: () => void;
  onView?: () => void;
  title: string;
  buttonTitle?: string;
  isLoading: boolean;
  SectionCard: React.FC<any>
}
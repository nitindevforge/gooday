export interface ServiceCardProps {
  title: string;
  subTitle?: string;
  price?: number;
  quantity: number;
  onUpdateQuantity: (quantity: number) => void;
}
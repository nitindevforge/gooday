import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { useTailwind } from "tailwind-rn";
import { CarouselProps } from "./type";

const Carousel: React.FC<CarouselProps> = ({
  slides = [],
  slideComponent: SlideComponent,
  pagination,
  slideActiveIndex,
  parRow = 3,
  style,
  assistant,
  paginationAbsolute = false
}) => {
  const scrollRef = useRef<ScrollView>(null);
  const { width } = Dimensions.get("window");
  const tailwind = useTailwind();

  const [active, setActive] = useState(0);

  const onScrollChange = ({ nativeEvent }) => {
    const contentOffsetX = nativeEvent.contentOffset.x;
    const slideWidth = width / parRow;
    const centerOffset = slideWidth / 2;
    const activeIndex = Math.floor(
      (contentOffsetX + centerOffset) / slideWidth
    );

    if (activeIndex > -1 && activeIndex < slides.length) {
      setActive(activeIndex);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current?.scrollTo({ x: -30, animated: false });
      }, 1);
    }
  }, [scrollRef.current]);

  useEffect(() => {
    if (slideActiveIndex) {
      slideActiveIndex(active);
    }
  }, [slideActiveIndex, active]);

  useEffect(() => {
    const scrollToAssistant = () => {
      const index = slides.findIndex((element) => element?.id === assistant);
      if (index !== -1) {
        setTimeout(() => {
          scrollRef.current?.scrollTo({
            x: index * (width / parRow),
            animated: true,
          });
        }, 100);
      }
    };
    scrollToAssistant();
  }, [assistant, slides, parRow, width]);
  return (
    <View style={[style]}>
      <ScrollView
        ref={scrollRef}
        centerContent={true}
        horizontal={true}
        onScroll={onScrollChange}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        snapToOffsets={slides.map((_, i) => i * (width / parRow))}
        snapToAlignment="start"
      >
        {slides.map((slide, index) => (
          <SlideComponent
            slide={slide}
            key={slide?.id || index}
            numberOfSlide={slides?.length}
            index={index}
            active={active}
          />
        ))}
      </ScrollView>
      {pagination && (
        <View
          style={[
            tailwind(clsx("flex-row items-center justify-center py-4", {
              "absolute bottom-2.5 left-0 right-0": paginationAbsolute
            })),
            { columnGap: 10 },
          ]}
        >
          {slides.map((slide, index) => (
            <View
              key={`pagination-${slide?.id || index}`}
              style={tailwind(
                clsx("w-1.5 h-1.5 bg-gray-600 rounded-full", {
                  "bg-primary-300 w-2.5 h-2.5": active === index,
                  "w-2.5 h-2.5": [1, -1].map((n) => active + n).includes(index) && !paginationAbsolute,
                  "w-2 h-2": [2, -2].map((n) => active + n).includes(index) && !paginationAbsolute,
                  "bg-white": active === index && paginationAbsolute,
                  "w-2 h-2 ": paginationAbsolute,
                })
              )}
            ></View>
          ))}
        </View>
      )}
    </View>
  );
};

export default Carousel;

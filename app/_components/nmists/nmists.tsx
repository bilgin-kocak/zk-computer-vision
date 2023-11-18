"use client";
import styles from "./nmists.module.scss";
import cn from "classnames";
import img1 from "@/public/mnist/test_image_0.jpg";
import img2 from "@/public/mnist/test_image_1.jpg";
import img3 from "@/public/mnist/test_image_2.jpg";
import img4 from "@/public/mnist/test_image_3.jpg";
import img5 from "@/public/mnist/test_image_4.jpg";
import img6 from "@/public/mnist/test_image_5.jpg";
import img7 from "@/public/mnist/test_image_6.jpg";
import img8 from "@/public/mnist/test_image_7.jpg";
import img9 from "@/public/mnist/test_image_8.jpg";
import img10 from "@/public/mnist/test_image_9.jpg";
import { useState } from "react";
import Image from "next/image";
import { useLocalStorage } from "@/hooks";
import numeral from "numeral";

const DIGITS = [
  {
    name: "Test Image 1",
    image: img1,
  },
  {
    name: "Test Image 2",
    image: img2,
  },
  {
    name: "Test Image 3",
    image: img3,
  },
  {
    name: "Test Image 4",
    image: img4,
  },
  {
    name: "Test Image 5",
    image: img5,
  },
  {
    name: "Test Image 6",
    image: img6,
  },
  {
    name: "Test Image 7",
    image: img7,
  },
  {
    name: "Test Image 8",
    image: img8,
  },
  {
    name: "Test Image 9",
    image: img9,
  },
  {
    name: "Test Image 10",
    image: img10,
  },
  
];

export default function Images({
  showResults = false,
  onSelectImage,
  mlResults,
}: {
  showResults?: boolean;
  onSelectImage?: (number: number) => void;
  mlResults?: string[];
}) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [mnistClassifierResults, setMnistClassifierResults] = useLocalStorage(
    "mnistClassifierResults",
    {
      candidates: Array(8).fill(0) as number[],
    }
  );

  const getTotalVotes = () => {
    return mnistClassifierResults.candidates.reduce((a, b) => a + b, 0);
  };

  const getShare = (index: number) => {
    const totalVotes = getTotalVotes();
    if (totalVotes === 0) {
      return 0;
    }
    return (mnistClassifierResults.candidates[index] / totalVotes) * 100;
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {DIGITS.map((digit, index) => (
          <div
            className={cn(styles.digit, {
              [styles.selected]: index === selectedIndex,
            })}
            key={index}
            onClick={() => {
              if (showResults) {
                return;
              }
              setSelectedIndex(index);
              onSelectImage?.(index);
            }}
          >
            <div className={styles.digit__image}>
              {showResults && getShare(index) > 0 && (
                <div
                  className={styles.digit__vote__mask}
                  style={{
                    height: `${getShare(index)}%`,
                  }}
                >
                  <p className={styles.digit__vote__value}>
                    {numeral(getShare(index)).format("0")}%
                  </p>
                </div>
              )}
              <Image
                src={digit.image}
                alt={`Picture of ${digit.name}`}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <p className={styles.digit__name}>{digit.name}</p>
            {mlResults && mlResults[index] !== "" && <p>Result: {mlResults[index]}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

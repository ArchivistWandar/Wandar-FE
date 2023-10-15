import React, { useEffect, useState } from "react";
import { Image, ScrollView, Dimensions } from "react-native";

const targetHeight = 200; // 원하는 이미지 높이
const maxHeight = 400; // 최대 높이

export default function AddMemo({ route }) {
  const { selectedPhotos } = route.params;
  const windowWidth = Dimensions.get("window").width;

  const [imagesData, setImagesData] = useState([]);
  const [secondRowImage, setSecondRowImage] = useState(null);

  useEffect(() => {
    Promise.all(
      selectedPhotos.map(
        (uri) =>
          new Promise((resolve) => {
            Image.getSize(uri, (width, height) =>
              resolve({ uri: uri, width: width, height: height })
            );
          })
      )
    ).then((images) => {
      if (images.length === 3) {
        let maxRatioIndex = 0;
        for (let i = 1; i < images.length; i++) {
          if (
            images[i].width / images[i].height >
            images[maxRatioIndex].width / images[maxRatioIndex].height
          ) {
            maxRatioIndex = i;
          }
        }

        setSecondRowImage(images[maxRatioIndex]);

        // Remove the image with the largest width-to-height ratio
        images.splice(maxRatioIndex, 1);
      } else if (images.length === 4) {
        setSecondRowImage(images.slice(2));
        images.splice(2);
      }

      setImagesData(images);
    });
  }, [selectedPhotos]);

  // Calculate total ratios for each row
  const totalFirstRowRatio = imagesData.reduce(
    (total, image) => total + image.width / image.height,
    0
  );

  return (
    <ScrollView contentContainerStyle={{ flexDirection: "column" }}>
      <ScrollView
        contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
      >
        {imagesData.map((image, index) => {
          let imageWidth =
            (windowWidth * (image.width / image.height)) / totalFirstRowRatio;
          let imageHeight = targetHeight;

          if (selectedPhotos.length === 1) {
            imageWidth = windowWidth;
            imageHeight = image.height * (windowWidth / image.width);

            // If calculated height is greater than max height
            if (imageHeight > maxHeight) {
              imageHeight = maxHeight;
              imageWidth = windowWidth;
            }
          }

          return (
            <Image
              key={index}
              source={{ uri: image.uri }}
              style={{
                width: imageWidth,
                height: imageHeight,
              }}
              resizeMode="cover"
            />
          );
        })}
      </ScrollView>
      {secondRowImage ? (
        <ScrollView
          contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
        >
          {Array.isArray(secondRowImage) ? (
            secondRowImage.map((image, index) => {
              let imageWidth;
              let imageHeight = targetHeight;

              if (selectedPhotos.length === 3) {
                imageWidth = windowWidth;
              } else if (selectedPhotos.length === 4) {
                imageWidth = windowWidth / 2;
              }

              return (
                <Image
                  key={index}
                  source={{ uri: image.uri }}
                  style={{
                    width: imageWidth,
                    height: imageHeight,
                  }}
                  resizeMode="cover"
                />
              );
            })
          ) : (
            // Handle the case when secondRowImage is not an array
            <Image
              source={{ uri: secondRowImage.uri }}
              style={{
                width: windowWidth, // or any other width you desire
                height: targetHeight,
              }}
              resizeMode="cover"
            />
          )}
        </ScrollView>
      ) : null}
    </ScrollView>
  );
}

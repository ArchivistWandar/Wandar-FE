import React, { useEffect } from "react";
import { Text } from "react-native";

function PhotoDateRange({ photos, textStyle, onDateRangeCalculated }) {
  // Function to calculate and format date range
  const calculateAndFormatDateRange = (photos) => {
    const safeParseDate = (dateStr) => {
      const timestamp = Date.parse(dateStr);
      return Number.isNaN(timestamp) ? null : new Date(timestamp);
    };

    const getPhotoDate = (exifData) => {
      let dateStr;
      if (exifData.DateTimeOriginal) {
        dateStr = exifData.DateTimeOriginal.replace(
          /^(\d{4}):(\d{2}):(\d{2}) /,
          "$1-$2-$3T"
        );
      } else if (exifData.GPSDateStamp) {
        dateStr = exifData.GPSDateStamp.replace(
          /^(\d{4}):(\d{2}):(\d{2})$/,
          "$1-$2-$3T00:00:00"
        );
      }
      return dateStr ? safeParseDate(dateStr) : null;
    };

    const creationDates = photos
      .map((photo) => getPhotoDate(photo.exif))
      .filter((date) => date);

    if (creationDates.length === 0) {
      return null;
    }

    const oldestDate = new Date(Math.min(...creationDates));
    const newestDate = new Date(Math.max(...creationDates));
    const formatter = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const formattedOldestDate = formatter.format(oldestDate);
    const formattedNewestDate = formatter.format(newestDate);

    return formattedOldestDate === formattedNewestDate
      ? formattedNewestDate
      : `${formattedOldestDate} ~ ${formattedNewestDate}`;
  };

  // Use effect to communicate date range to parent
  useEffect(() => {
    const dateRange = calculateAndFormatDateRange(photos);
    onDateRangeCalculated && onDateRangeCalculated(dateRange);
  }, [photos, onDateRangeCalculated]);

  // Render formatted date range
  const formattedDateRange = calculateAndFormatDateRange(photos);
  if (!formattedDateRange) {
    return null;
  }

  return <Text style={textStyle}>{formattedDateRange}</Text>;
}

export default PhotoDateRange;

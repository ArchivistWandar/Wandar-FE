import React from "react";
import { Text } from "react-native";

function PhotoDateRange({ photos, textStyle }) {
  // Helper function to safely parse date from EXIF data and handle invalid dates
  const safeParseDate = (dateStr) => {
    const timestamp = Date.parse(dateStr);
    return Number.isNaN(timestamp) ? null : new Date(timestamp);
  };

  // Helper function to extract and format date from EXIF data
  const getPhotoDate = (exifData) => {
    let dateStr;
    if (exifData.DateTimeOriginal) {
      // Convert date string to ISO 8601 format if possible
      dateStr = exifData.DateTimeOriginal.replace(
        /^(\d{4}):(\d{2}):(\d{2}) /,
        "$1-$2-$3T"
      );
    } else if (exifData.GPSDateStamp) {
      // Convert GPSDateStamp to a full date string by assuming a time of 00:00:00
      dateStr = exifData.GPSDateStamp.replace(
        /^(\d{4}):(\d{2}):(\d{2})$/,
        "$1-$2-$3T00:00:00"
      );
    }

    // Use the safeParseDate function to parse the date string
    return dateStr ? safeParseDate(dateStr) : null;
  };

  // Extract creation dates from EXIF data
  const creationDates = photos
    .map((photo) => getPhotoDate(photo.exif))
    .filter((date) => date); // Filter out any null values

  // If no valid dates, return null or some default text
  if (creationDates.length === 0) {
    return null;
  }

  // Find the oldest and newest dates
  const oldestDate = new Date(Math.min(...creationDates));
  const newestDate = new Date(Math.max(...creationDates));

  // Date formatting
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const formattedOldestDate = formatter.format(oldestDate);
  const formattedNewestDate = formatter.format(newestDate);

  // Display the date or date range
  if (formattedOldestDate === formattedNewestDate) {
    return <Text style={textStyle}>{formattedNewestDate}</Text>;
  }
  return (
    <Text style={textStyle}>
      {`${formattedOldestDate} ~ ${formattedNewestDate}`}
    </Text>
  );
}

export default PhotoDateRange;

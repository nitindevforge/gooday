export const getWeatherGreeting = () => {
  const greetings = [
    "Plan today, excel tomorrow",
    "Start fresh, stay organised",
    "Live life fully every day",
    "Reserve time for you",
    "Master time, master life",
    "Happiness starts with you",
    "Small moments matter most",
    "Create memories worth remembering",
    "Choose rest over burnout",
    "Take time for yourself",
    "Chase sunsets, not deadlines",
    "Let happiness guide you",
    "Laugh more, stress less",
    "Peace begins with you",
    "Choose calm over chaos",
    "Rest is not optional",
  ]

  // Get the current date and use it to generate a unique index for the greeting
  const dayOfYear = Math.floor(
    (new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  // Use the day of the year to index into the greetings array, looping through the array
  const greetingIndex = dayOfYear % greetings.length;

  return {
    title: "Chill Vibes",
    subtitle: greetings[greetingIndex],
  };
};

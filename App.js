import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import { GoalItem } from "./components/GoalItem";
import { GoalInput } from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const onAddGoal = (goalTitle) => {
    setCourseGoals((currentGoals) => [
      ...currentGoals,
      { key: Math.random().toString(), value: goalTitle },
    ]);
    setIsAddMode(false);
    //Not Rerender twice it will batch rerender once
  };
  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  };

  const removeGoalHandler = (goalId) => {
    setCourseGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.key !== goalId);
    });
  };
  return (
    <View style={styles.screen}>
      <Button
        title="Add New Goal"
        onPress={() => {
          setIsAddMode(true);
        }}
      />
      <GoalInput
        visible={isAddMode}
        onAddGoal={onAddGoal}
        courseGoals={courseGoals}
        setCourseGoals={setCourseGoals}
        onCancel={cancelGoalAdditionHandler}
      />
      <FlatList
        data={courseGoals}
        renderItem={(itemData) => (
          <GoalItem
            id={itemData.item.key}
            title={itemData.item.value}
            onDelete={removeGoalHandler}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});

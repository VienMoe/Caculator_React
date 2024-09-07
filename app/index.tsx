import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Calculator = () => {
  const [input, setInput] = useState<string>("0");
  const [operator, setOperator] = useState<string | null>(null);
  const [firstValue, setFirstValue] = useState<string | null>(null);
  const [operationDisplay, setOperationDisplay] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]);
  const [isHistoryVisible, setIsHistoryVisible] = useState<boolean>(false);

  const getFontSize = (inputLength: number) => {
    if (inputLength > 20) return 24;
    if (inputLength > 11) return 32;
    return 48;
  };

  const handleNumberPress = (num: string) => {
    if (input.length >= 20) return;
    if (input === "0") {
      setInput(num);
    } else {
      setInput(input + num);
    }
  };

  const handleOperatorPress = (op: string) => {
    setFirstValue(input);
    setOperationDisplay(`${input} ${op}`);
    setInput("0");
    setOperator(op);
  };

  const handleEqualPress = () => {
    const firstNum = parseFloat(firstValue || "0");
    const secondNum = parseFloat(input);
    let result = 0;

    switch (operator) {
      case "+":
        result = firstNum + secondNum;
        break;
      case "-":
        result = firstNum - secondNum;
        break;
      case "*":
        result = firstNum * secondNum;
        break;
      case "/":
        result = firstNum / secondNum;
        break;
      default:
        return;
    }

    const calculation = `${firstValue} ${operator} ${input} = ${result}`;
    setHistory((prevHistory) => {
      const newHistory = [...prevHistory, calculation];
      return newHistory.length > 7 ? newHistory.slice(-7) : newHistory;
    });

    setInput(result.toString());
    setFirstValue(null);
    setOperator(null);
    setOperationDisplay("");
  };

  const handleBackspace = () => {
    if (input.length > 1) {
      setInput(input.slice(0, -1));
    } else {
      setInput("0");
    }
  };

  const handleClearAll = () => {
    setInput("0");
    setFirstValue(null);
    setOperator(null);
    setOperationDisplay("");
  };

  const toggleNegative = () => {
    if (input.startsWith("-")) {
      setInput(input.slice(1));
    } else {
      setInput("-" + input);
    }
  };

  const handlePercentagePress = () => {
    setInput((parseFloat(input) / 100).toString());
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const toggleHistoryModal = () => {
    setIsHistoryVisible(!isHistoryVisible);
  };

  const themeStyles = isDarkMode ? darkStyles : lightStyles;

  return (
    <SafeAreaView style={[styles.container, themeStyles.container]}>
      <View style={styles.fixedIcons}>
        <TouchableOpacity onPress={toggleDarkMode} style={styles.themeButton}>
          <Icon
            name={isDarkMode ? "moon-o" : "sun-o"}
            size={30}
            color={isDarkMode ? "#FFF" : "#FFA500"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleHistoryModal}
          style={styles.themeButton}
        >
          <Icon name="history" size={30} color={isDarkMode ? "#FFF" : "#333"} />
        </TouchableOpacity>
      </View>

      <Text style={[styles.operationDisplay, themeStyles.operationDisplay]}>
        {operationDisplay}
      </Text>

      <Text
        style={[
          styles.input,
          themeStyles.input,
          { fontSize: getFontSize(input.length) },
        ]}
      >
        {input}
      </Text>

      <View style={styles.row}>
        <TouchableOpacity
          onPress={handleClearAll}
          style={[styles.button, themeStyles.button, styles.yellowButton]}
        >
          <Text style={themeStyles.buttonText}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleNegative}
          style={[styles.button, themeStyles.button, styles.yellowButton]}
        >
          <Text style={themeStyles.buttonText}>+/-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleBackspace}
          style={[styles.button, themeStyles.button, styles.yellowButton]}
        >
          <Text style={themeStyles.buttonText}>⌫</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleOperatorPress("/")}
          style={[styles.button, themeStyles.button, styles.yellowButton]}
        >
          <Text style={themeStyles.buttonText}>÷</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => handleNumberPress("7")}
          style={[styles.button, themeStyles.button]}
        >
          <Text style={themeStyles.buttonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNumberPress("8")}
          style={[styles.button, themeStyles.button]}
        >
          <Text style={themeStyles.buttonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNumberPress("9")}
          style={[styles.button, themeStyles.button]}
        >
          <Text style={themeStyles.buttonText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleOperatorPress("*")}
          style={[styles.button, themeStyles.button, styles.yellowButton]}
        >
          <Text style={themeStyles.buttonText}>×</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => handleNumberPress("4")}
          style={[styles.button, themeStyles.button]}
        >
          <Text style={themeStyles.buttonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNumberPress("5")}
          style={[styles.button, themeStyles.button]}
        >
          <Text style={themeStyles.buttonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNumberPress("6")}
          style={[styles.button, themeStyles.button]}
        >
          <Text style={themeStyles.buttonText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleOperatorPress("-")}
          style={[styles.button, themeStyles.button, styles.yellowButton]}
        >
          <Text style={themeStyles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => handleNumberPress("1")}
          style={[styles.button, themeStyles.button]}
        >
          <Text style={themeStyles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNumberPress("2")}
          style={[styles.button, themeStyles.button]}
        >
          <Text style={themeStyles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNumberPress("3")}
          style={[styles.button, themeStyles.button]}
        >
          <Text style={themeStyles.buttonText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleOperatorPress("+")}
          style={[styles.button, themeStyles.button, styles.yellowButton]}
        >
          <Text style={themeStyles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => handleNumberPress("0")}
          style={[styles.button, themeStyles.button]}
        >
          <Text style={themeStyles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePercentagePress}
          style={[styles.button, themeStyles.button]}
        >
          <Text style={themeStyles.buttonText}>%</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNumberPress(".")}
          style={[styles.button, themeStyles.button]}
        >
          <Text style={themeStyles.buttonText}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleEqualPress}
          style={[styles.button, themeStyles.button, styles.yellowButton]}
        >
          <Text style={themeStyles.buttonText}>=</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={isHistoryVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={toggleHistoryModal}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <ScrollView>
              {history.slice(-7).map((item, index) => (
                <Text key={index} style={styles.historyText}>
                  {item}
                </Text>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
  },
  fixedIcons: {
    position: "absolute",
    top: 10,
    right: 20,
    flexDirection: "row",
  },
  input: {
    fontSize: 48,
    textAlign: "right",
    marginBottom: 10,
  },
  operationDisplay: {
    fontSize: 24,
    textAlign: "right",
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 25,
    margin: 8,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  yellowButton: {
    backgroundColor: "#FFCC00",
  },
  themeButton: {
    marginBottom: 100,
    marginRight: 12,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  closeButtonText: {
    color: "#FF0000",
    fontSize: 16,
  },
  historyText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 5,
  },
});

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: "#f1f1f1",
  },
  input: {
    color: "#000",
  },
  operationDisplay: {
    color: "#555",
  },
  button: {
    backgroundColor: "#e0e0e0",
  },
  buttonText: {
    color: "#000",
    fontSize: 24,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
  },
  input: {
    color: "#fff",
  },
  operationDisplay: {
    color: "#bbb",
  },
  button: {
    backgroundColor: "#333",
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
  },
});

export default Calculator;

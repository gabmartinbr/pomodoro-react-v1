import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import Header from './src/components/Header';
import Timer from './src/components/Timer';
import { Audio } from 'expo-av';

colors = ["#BA4949", "#38a3a5", "#2a6f97"];

const FOCUS_TIME = 25 * 60;
const SHORT_BREAK = 5 * 60;
const LONG_BREAK = 15 * 60;

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("FOCUS TIME" | "SHORT BREAK" | "LONG BREAK");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
  
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000); // Decrementa cada segundo
    } else {
      clearInterval(interval);
    }
  
    if (time === 0) {
      setIsActive(false); // Detiene el temporizador
      playSound();
    }
    
    return () => clearInterval(interval);
  }, [isActive, time, currentTime]);

  function handleStartStop() {
    playSound();
    setIsActive(!isActive);
  }


  async function playSound() {
    let soundToPlay;
    if(isActive) {
      soundToPlay = require("./assets/stopsound.mp3");
    } else {
      soundToPlay = require("./assets/playsound.mp3");
    }

    const {sound} = await Audio.Sound.createAsync(soundToPlay);
    await sound.playAsync();
  }

  return (
    <View
      style={[styles.container, {backgroundColor: colors[currentTime] }]}
    >
      <View style={styles.container}>
        <Text style={styles.title}>pomodoro v1</Text>
        <Header 
          currentTime={currentTime} 
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />

        <View style={styles.circleContainer}>
          <View style={styles.circle}>
            <Timer time={time} />
          </View>
        </View>

        <TouchableOpacity onPress={handleStartStop}>
          <Text style={styles.active}>{isActive ? "| |" : "▶"}</Text>
        </TouchableOpacity>

      </View>
      <StatusBar style="auto"/>  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    paddingTop: 50,
    
  },
  timer: {
    textAlign: 'center',
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1
  },
  circle: {
    width: 325,
    height: 325,
    borderRadius: 350,
    borderWidth: 2,
    borderColor: "white",
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    color: "white",
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
    padding: 50
  }

});

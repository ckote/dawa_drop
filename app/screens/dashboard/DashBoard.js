import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useUserContext } from "../../context/hooks";
import { useHospital, useUser } from "../../api/hooks";
import {
  LineChart,
  BarChart,
  ProgressChart,
  PieChart,
  ContributionGraph,
} from "react-native-chart-kit";
import { Text } from "react-native-paper";
import {
  calculateBMI,
  getTestResultsMonthlyMeans,
  getTriadsMonthlyMeans,
  toPiechartData,
} from "../../utils/helpers";
import moment from "moment";
import {
  screenHeight,
  screenWidth,
  weightChartConfig,
} from "../../utils/contants";
import colors from "../../utils/colors";
import HeightChart from "../../components/charts/HeightChart";
import WeightChart from "../../components/charts/WeightChart";
import PressureChart from "../../components/charts/PressureChart";
import BMIChart from "../../components/charts/BMIChart";
import ViralLoadChart from "../../components/charts/ViralLoadChart";
import CD4Chart from "../../components/charts/CD4Chart";
import TempratureChart from "../../components/charts/TempratureChart";
import HeartRateChart from "../../components/charts/HeartRateChart";
import BMIStatusChart from "../../components/charts/BMIStatusChart";
import AppointmentsFrequencyChart from "../../components/charts/AppointmentsFrequencyChart";
import NutritionChart from "../../components/charts/NutritionChart";

const DashBoard = ({ navigation }) => {
  const [triads, setTriads] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const { getUser, getTriads, getTestResults, getAppointments } = useUser();
  const { getSummaryStats } = useHospital();
  const [appointments, setAppointments] = useState([]);

  const { user, token } = useUserContext();

  const handleFetchTriads = async (url) => {
    let response = await getTriads(token, {});
    if (response.ok) {
      setTriads(response.data.results);
    } else {
      console.log("Dashboard: ", response.problem, response.data);
    }

    response = await getTestResults(token, {});
    if (response.ok) {
      setTestResults(response.data.results);
    } else {
      console.log("Dashboard: ", response.problem, response.data);
    }
    response = await getAppointments(token, {});
    if (response.ok) {
      setAppointments(response.data.results);
    } else {
      console.log("Dashboard: ", response.problem, response.data);
    }
  };

  useEffect(() => {
    if (!user) getUser();
    handleFetchTriads();
  }, []);
  const {
    monthlyHeights,
    monthlyWeights,
    monthlypressure,
    months,
    monthlyHeartRate,
    monthlyTemperature,
  } = getTriadsMonthlyMeans(triads);
  const {
    monthlyCD4Count,
    monthlyViralLoads,
    months: testMonths,
  } = getTestResultsMonthlyMeans(testResults);
  const monthlyBMI = monthlyHeights.map((height, index) => {
    const bmi = calculateBMI(monthlyWeights[index], height);
    return bmi ? bmi : 0;
  });

  return (
    <ScrollView
      contentContainerStyle={styles.contentStyle}
      style={styles.screen}
    >
      <BMIStatusChart />
      {triads.length !== 0 && (
        <NutritionChart
          bmi={parseFloat(
            calculateBMI(triads[0].weight, triads[0].height)
          ).toFixed(2)}
        />
      )}
      <BMIChart x={months} y={monthlyBMI} />

      <AppointmentsFrequencyChart
        attendanceData={appointments.map(({ created_at }) => ({
          date: created_at,
          count: 1,
        }))}
      />
      <WeightChart x={months} y={monthlyWeights} />
      <HeightChart x={months} y={monthlyHeights} />
      <PressureChart x={months} y={monthlypressure} />
      <ViralLoadChart x={months} y={monthlyViralLoads} />
      <CD4Chart x={months} y={monthlyCD4Count} />
      <TempratureChart x={months} y={monthlyTemperature} />
      <HeartRateChart x={months} y={monthlyHeartRate} />
    </ScrollView>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  weights: {
    borderRadius: 16,
  },

  screen: {
    backgroundColor: colors.white,
    flex: 1,
    padding: 10,
  },
  contentStyle: {
    alignItems: "center",
    paddingBottom: 20,
  },
});

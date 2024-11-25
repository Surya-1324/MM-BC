import numpy as np
import pandas as pd
from scipy.optimize import fsolve

# Define your constants and variables
gvw = 700
gear_ratio = 8
wheel_radius = 0.23
frontal_area = 3.25
cd = 0.4
rolling_resistance_coeff = 0.015
gear_efficiency = 90
rated_speed_kmph_at_5deg = 30
max_speed = 60
gradeability = 12
time_to_cross_grade_from_rest = 11
length_of_grade = 20
acceleration_from_rest_to_speed = 50
time_to_accelerate = 12
g = 9.8
rho_air = 1.2
v_dc = 320

# Define your functions here

def motor_spec_peak_torque(rho_air, cd, frontal_area, gvw, rolling_resistance_coeff, time_to_cross_grade_from_rest, length_of_grade, g, wheel_radius, gear_ratio, gear_efficiency, gradeability):
    A = calculate_parameter_A(rho_air, cd, frontal_area, gvw, rolling_resistance_coeff)
    print(A)
    solution = fsolve(distance_equation, 0.5, args=(A, time_to_cross_grade_from_rest, length_of_grade))
    B = solution[0]
    print(B)
    motor_torque = calc_motor_torque_from_B(B, g, rolling_resistance_coeff, gvw, wheel_radius, gear_ratio, gear_efficiency, gradeability)
    print(motor_torque)
    wheel_torque = calculate_wheel_torque(motor_torque, gear_ratio, gear_efficiency)
    speed1 = calculate_speed(A, B, time_to_cross_grade_from_rest)
    motor_rpm = calculate_motor_rpm(speed1, wheel_radius, gear_ratio)
    print(motor_rpm)
    power = calculate_power(motor_torque, motor_rpm)
    print(power)
    motor_speed_rpm_peak_torque = round(motor_rpm) if not np.isnan(motor_rpm) else 0
    motor_torque_peak_torque = round(motor_torque)
    motor_power_peak_torque = round(power, 2)
    print("Motor Speed RPM (Peak Torque):", motor_speed_rpm_peak_torque)
    print("Motor Torque (Peak Torque):", motor_torque_peak_torque)
    print("Motor Power (Peak Torque):", motor_power_peak_torque)
    return motor_speed_rpm_peak_torque, motor_torque_peak_torque, motor_power_peak_torque

def motor_spec_peak_power_modified(motor_power_peak_torque, motor_torque_peak_torque):
    # Assume peak power = power @ pk speed * 1.5
    factor = 4
    print(motor_power_peak_torque)
    if np.isnan(motor_power_peak_torque):
        motor_power_peak_torque = 0
    print(motor_power_peak_torque)
    power = motor_power_peak_torque * factor

    # Calculate time at which we reach peak power assuming peak torque
    A = calculate_parameter_A(rho_air, cd, frontal_area, gvw, rolling_resistance_coeff)
    wheel_torque = calculate_wheel_torque(motor_torque_peak_torque, gear_ratio, gear_efficiency)
    B = calculate_parameter_B(wheel_torque, 0, gvw, wheel_radius, g, rolling_resistance_coeff)

    solution = fsolve(time_for_power, 1, args=(A, B, motor_torque_peak_torque, wheel_radius, gear_ratio, power), xtol=0.1)
    t1 = solution[0]
    v1 = calculate_speed(A, B, t1)
    v2 = 100 / 3.6  # 100 kmph in m/s
    a1 = v1 / t1
    c = a1 * v1
    t2 = (v2 ** 2 - v1 ** 2) / (2 * c)
    t = t1 + t2
    
    if np.isnan(v1):
        v1 = 0
    
    motor_rpm = calculate_motor_rpm(v1, wheel_radius, gear_ratio)
    motor_speed_rpm_peak_power = round(motor_rpm) if not np.isnan(motor_rpm) else 0
    motor_torque_peak_power = round(motor_torque_peak_torque)
    motor_power_peak_power = round(power, 2)
    print("Motor Speed RPM (Peak Power):", motor_speed_rpm_peak_power)
    print("Motor Torque (Peak Power):", motor_torque_peak_power)
    print("Motor Power (Peak Power):", motor_power_peak_power)
    return motor_speed_rpm_peak_power, motor_torque_peak_power, motor_power_peak_power

def calculate_parameter_A(rho_air, cd, frontal_area, gvw, rolling_resistance_coeff):
    return rho_air * cd * frontal_area / (2 * gvw)

def distance_equation(B, A, t, S):
    return (1 / A) * np.log(np.exp(2 * np.sqrt(A * B) * t) + 1) - np.sqrt(B / A) * t - (np.log(2) / A) - S

def calc_motor_torque_from_B(B,g,rolling_resistance_coeff,gvw,wheel_radius,gear_ratio,gear_efficiency,slope):

    motor_torque = (B+g*(rolling_resistance_coeff*cos(slope)+sin(slope)))*((gvw*wheel_radius*100)/(gear_ratio*gear_efficiency))

    return motor_torque

def calculate_wheel_torque(motor_torque, gear_ratio, gear_efficiency):
    return (motor_torque * gear_ratio * gear_efficiency) / 100

def calculate_speed(A, B, t):
    return np.sqrt(B / A) * (1 - 2 / (np.exp(2 * np.sqrt(A * B) * t) + 1))

def calculate_motor_rpm(speed, wheel_radius, gear_ratio):
    return speed / (2 * np.pi * wheel_radius) * gear_ratio * 60

def calculate_power(motor_torque, motor_rpm):
    return motor_torque * motor_rpm / 9.55 / 1000

def calculate_parameter_B(wheel_torque, slope_deg, gvw, wheel_radius, g, rolling_resistance_coeff):
    slope_radians = slope_deg * np.pi / 180
    return wheel_torque / (gvw * wheel_radius) - g * (rolling_resistance_coeff * np.cos(slope_deg) + np.sin(slope_deg))

def time_for_power(t, A, B, motor_torque, wheel_radius, gear_ratio, p):
    speed = calculate_speed(A, B, t)  # m/s
    speed_rpm = calculate_motor_rpm(speed, wheel_radius, gear_ratio)
    power = calculate_power(motor_torque, speed_rpm)
    return power - p

def sin(theta):

    return np.round(np.sin(np.deg2rad(theta)),10)

def cos(theta):

    return np.round(np.cos(np.deg2rad(theta)),10)

# Call the function to calculate and print the results for peak torque
print("\nCalculating Peak Torque Values:")
speed_torque_power_torque = motor_spec_peak_torque(rho_air, cd, frontal_area, gvw, rolling_resistance_coeff, time_to_cross_grade_from_rest, length_of_grade, g, wheel_radius, gear_ratio, gear_efficiency, gradeability)

# Call the function to calculate and print the results for peak power
print("\nCalculating Peak Power Values:")
motor_spec_peak_power_modified(speed_torque_power_torque[2], speed_torque_power_torque[1])  # Using the power and torque values from peak torque

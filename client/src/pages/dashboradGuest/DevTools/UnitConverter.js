import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

const UnitConverter = () => {
    const [fromUnit, setFromUnit] = useState('');
    const [toUnit, setToUnit] = useState('');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');

    const handleConvert = async () => {
        const response = await fetch('/api/convert-unit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fromUnit, toUnit, value }),
        });
        const data = await response.json();
        setResult(data.result);
    };

    const unitCategories = {
        distance: ['km', 'm', 'cm', 'mm', 'miles', 'yd', 'ft', 'in'],
        weight: ['kg', 'g', 'mg', 'lbs', 'oz'],
        temperature: ['celsius', 'fahrenheit', 'kelvin'],
        volume: ['L', 'mL', 'm³', 'gal', 'qt', 'pt', 'cup', 'fl oz'],
        area: ['m²', 'ha', 'km²', 'ft²', 'ac', 'mi²'],
        speed: ['km/h', 'm/s', 'mph', 'ft/s'],
        energy: ['J', 'kJ', 'cal', 'kcal', 'BTU'],
        power: ['W', 'kW', 'hp'],
        pressure: ['Pa', 'kPa', 'bar', 'atm', 'psi']
    };

    const getCategory = (unit) => {
        if (['km', 'm', 'cm', 'mm', 'miles', 'yd', 'ft', 'in'].includes(unit)) return 'distance';
        if (['kg', 'g', 'mg', 'lbs', 'oz'].includes(unit)) return 'weight';
        if (['celsius', 'fahrenheit', 'kelvin'].includes(unit)) return 'temperature';
        if (['L', 'mL', 'm³', 'gal', 'qt', 'pt', 'cup', 'fl oz'].includes(unit)) return 'volume';
        if (['m²', 'ha', 'km²', 'ft²', 'ac', 'mi²'].includes(unit)) return 'area';
        if (['km/h', 'm/s', 'mph', 'ft/s'].includes(unit)) return 'speed';
        if (['J', 'kJ', 'cal', 'kcal', 'BTU'].includes(unit)) return 'energy';
        if (['W', 'kW', 'hp'].includes(unit)) return 'power';
        if (['Pa', 'kPa', 'bar', 'atm', 'psi'].includes(unit)) return 'pressure';
        return '';
    };

    const possibleToUnits = unitCategories[getCategory(fromUnit)] || [];

    return (
        <>
            <Helmet>
                <title>Free Unit Converter - Convert Between Various Units Instantly</title>
                <meta name="description" content="Convert between different units of measurement easily with our free unit converter tool." />
            </Helmet>

            <main className="max-w-3/4 h-full flex flex-col items-center min-h-screen p-2">
                <div className="container bg-white p-2 md:p-10 rounded-lg mx-auto flex-col">
                    <div className="max-w-2xl mx-auto mt-10 p-8 bg-gradient-to-br from-white-900 to-white-800 rounded-xl shadow-2xl">
                        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Unit Converter</h1>
                        <p className="text-center text-gray-600 mb-8">
                            Convert between different units of measurement quickly and easily. Enter your value, select the units, and get the result instantly.
                        </p>
                        <div className="flex flex-col space-y-4">
                            {result && <p className="mt-4 text-center text-2xl font-bold text-green-800">{value} {fromUnit} = {result} {toUnit}</p>}

                            <input
                                type="number"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="Enter value"
                                className="w-full p-2 border rounded-md"
                            />

                            <select
                                value={fromUnit}
                                onChange={(e) => {
                                    const newFromUnit = e.target.value;
                                    setFromUnit(newFromUnit);
                                    setToUnit('');
                                    setResult('');
                                }}
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="" disabled>Select From Unit</option>
                                <option value="km">Kilometers (km)</option>
                                <option value="m">Meters (m)</option>
                                <option value="cm">Centimeters (cm)</option>
                                <option value="mm">Millimeters (mm)</option>
                                <option value="miles">Miles (mi)</option>
                                <option value="yd">Yards (yd)</option>
                                <option value="ft">Feet (ft)</option>
                                <option value="in">Inches (in)</option>
                                <option value="kg">Kilograms (kg)</option>
                                <option value="g">Grams (g)</option>
                                <option value="mg">Milligrams (mg)</option>
                                <option value="lbs">Pounds (lbs)</option>
                                <option value="oz">Ounces (oz)</option>
                                <option value="celsius">Celsius (°C)</option>
                                <option value="fahrenheit">Fahrenheit (°F)</option>
                                <option value="kelvin">Kelvin (K)</option>
                                <option value="L">Liters (L)</option>
                                <option value="mL">Milliliters (mL)</option>
                                <option value="m³">Cubic meters (m³)</option>
                                <option value="gal">Gallons (gal)</option>
                                <option value="qt">Quarts (qt)</option>
                                <option value="pt">Pints (pt)</option>
                                <option value="cup">Cups (cup)</option>
                                <option value="fl oz">Fluid ounces (fl oz)</option>
                                <option value="m²">Square meters (m²)</option>
                                <option value="ha">Hectares (ha)</option>
                                <option value="km²">Square kilometers (km²)</option>
                                <option value="ft²">Square feet (ft²)</option>
                                <option value="ac">Acres (ac)</option>
                                <option value="mi²">Square miles (mi²)</option>
                                <option value="km/h">Kilometers per hour (km/h)</option>
                                <option value="m/s">Meters per second (m/s)</option>
                                <option value="mph">Miles per hour (mph)</option>
                                <option value="ft/s">Feet per second (ft/s)</option>
                                <option value="J">Joules (J)</option>
                                <option value="kJ">Kilojoules (kJ)</option>
                                <option value="cal">Calories (cal)</option>
                                <option value="kcal">Kilocalories (kcal)</option>
                                <option value="BTU">British thermal units (BTU)</option>
                                <option value="W">Watts (W)</option>
                                <option value="kW">Kilowatts (kW)</option>
                                <option value="hp">Horsepower (hp)</option>
                                <option value="Pa">Pascals (Pa)</option>
                                <option value="kPa">Kilopascals (kPa)</option>
                                <option value="bar">Bar (bar)</option>
                                <option value="atm">Atmospheres (atm)</option>
                                <option value="psi">Pounds per square inch (psi)</option>
                            </select>

                            <select
                                value={toUnit}
                                onChange={(e) => { setToUnit(e.target.value); setResult('') }}
                                className="w-full p-2 border rounded-md"
                                disabled={!fromUnit} // Disable if no fromUnit is selected
                            >
                                <option value="" disabled>Select To Unit</option>
                                {possibleToUnits.map(unit => (
                                    <option key={unit} value={unit}>
                                        {unitCategories[getCategory(fromUnit)].find(opt => opt === unit)}
                                    </option>
                                ))}
                            </select>

                            <button
                                onClick={handleConvert}
                                className="w-full bg-main-color hover:bg-blue-300 text-white font-bold py-2 px-4 rounded-lg"
                            >
                                Convert
                            </button>
                        </div>
                    </div>

                    <div className="mt-10 max-w-2xl mx-auto text-center">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Effortless Unit Conversion!</h3>
                        <p className="text-gray-600 mb-4">
                            Our unit converter allows you to easily convert between various units of measurement. Simply input your value, select the units, and get the conversion result instantly.
                        </p>
                        <p className="text-gray-600">
                            If you need any help or have questions, please <a href="mailto:javatp01@gmail.com" className="text-blue-500 hover:underline">contact us</a>. We're here to assist you!
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
};

export default UnitConverter;

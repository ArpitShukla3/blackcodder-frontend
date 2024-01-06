import { DataState } from "../Context/Context"
import { Chart } from "react-google-charts";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, ComposedChart, Bar, Area, BarChart, Rectangle, Cell, Brush, ReferenceLine, FunnelChart, Funnel, LabelList, AreaChart } from 'recharts';
export default function Graph() {
    const { results } = DataState();
    // Create an array of distinct values and their frequencies for the "type" field
    const data = results.data.data.reduce((acc, doc) => {
        const existingType = acc.find(item => item.type === doc.country);
        if (existingType) {
            existingType.frequency += 1;
        } else {
            acc.push({ type: doc.country, frequency: 1 });
        }

        return acc;
    }, []);
    const data2 = results.data.data.reduce((acc, doc) => {
        const existingType = acc.find(item => item.name === doc.pestle);
        if (existingType) {
            existingType.frequency += 1;
        } else {
            acc.push({ name: doc.pestle, frequency: 1, fill: getRandomHexCode() });
        }

        return acc;
    }, []);
    function getRandomHexCode() {
        // Generate random values for red, green, and blue components
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);

        // Convert decimal values to hexadecimal and pad with zeros if needed
        const hexRed = red.toString(16).padStart(2, '0');
        const hexGreen = green.toString(16).padStart(2, '0');
        const hexBlue = blue.toString(16).padStart(2, '0');

        // Concatenate the components to create the final hex code
        const hexCode = `#${hexRed}${hexGreen}${hexBlue}`;

        return hexCode;
    }
    return (
        <div className="-z-10 flex  flex-col lg:flex-row lg:flex-wrap">
            <div className={`h-auto   bg-white hover:bg-gray-400`}>
                <LineChart
                    width={1000}
                    height={300}
                    data={data}

                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="frequency" stroke="#141416" activeDot={{ r: 8 }} />
                </LineChart>
            </div>
            <div className={`h-auto   bg-white hover:bg-gray-400`}>
                <PieChart width={400} height={400}>
                    <Pie data={data} dataKey="frequency" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" nameKey="country" />
                </PieChart>
            </div>
            <div className={`h-auto   bg-white hover:bg-gray-400`}>
                <FunnelChart width={730} height={250}>
                    <Tooltip />
                    <Funnel
                        dataKey="frequency"
                        data={data2}
                        isAnimationActive
                    >
                        <LabelList position="right" fill="#000" stroke="none" dataKey="country" />
                    </Funnel>
                    <Brush dataKey="frequency" stroke="#8884d8" />
                </FunnelChart>
            </div>

            <div className={`h-auto   bg-white hover:bg-gray-400`}>
                <BarChart width={730} height={250} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="country" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="frequency" fill="#8884d8" />
                    <Brush dataKey="frequency" stroke="#8884d8" />
                </BarChart>
            </div>
            <div className={`h-auto   bg-white hover:bg-gray-400`}>
                <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="frequency" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </div>
        </div>
    );
}
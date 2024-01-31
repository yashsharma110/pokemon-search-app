import { Bar } from "react-chartjs-2";

function BarChart({ data }) {
  return (
    <div>
      <Bar
        data={{
          labels: data.stats.map(({ stat }) => {
            return stat.name[0].toUpperCase() + stat.name.slice(1);
          }),
          datasets: [
            {
              label: data.name[0].toUpperCase() + data.name.slice(1),
              data: data.stats.map(({ base_stat }) => {
                return base_stat;
              }),
              backgroundColor: "#f5c8c8",
              borderColor: "#7d6262",
              borderWidth: 2,
            },
          ],
        }}
        height="200px"
        width="300px"
        options={{
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
}

export default BarChart;

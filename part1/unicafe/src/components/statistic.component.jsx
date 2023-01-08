const StatisticLine = ({text, stat}) => <td>{text}: {stat}</td>;

const Statistic = ({ statistics }) => {
    return (
        <table>
            <tbody>    
                {statistics.map((statistic) => 
                <tr key={statistic.name}>
                    <StatisticLine 
                        text={statistic.name} 
                        stat={statistic.value} 
                    />
                </tr>
                    )
                }
            </tbody>
        </table>
    );
}

export default Statistic;
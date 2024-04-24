import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import "./featuredInfo.css";
import { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";

const FeaturedInfo = () => {
  const [income, setIncome] = useState([]);
  const [sales, setSales] = useState([]);
  const [costs, setCosts] = useState([]);
  const [incomePerc, setIncomePerc] = useState(60);
  const [salesPerc, setSalesPerc] = useState(34);
  const [costsPerc, setCostsPerc] = useState(89);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching monthly income
        const incomeRes = await userRequest.get("orders/income");
        setIncome(incomeRes.data);

        // Fetching monthly sales
        const salesRes = await userRequest.get("orders/sales");
        setSales(salesRes.data);

        // Fetching monthly costs
        const costsRes = await userRequest.get("expenses/costs");
        setCosts(costsRes.data);

        // Calculating percentage change in income
        const incomeChange =
          (incomeRes.data[1].total * 100) / incomeRes.data[0].total - 100;
        setIncomePerc(Math.floor(incomeChange)); //prevent from float points e.g 3.3333 to 3 only

        // Calculating percentage change in sales
        const salesChange =
          (salesRes.data[1].total * 100) / salesRes.data[0].total - 100;
        setSalesPerc(Math.floor(salesChange));

        // Calculating percentage change in costs
        const costsChange =
          (costsRes.data[1].total * 100) / costsRes.data[0].total - 100;
        setCostsPerc(Math.floor(costsChange));
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[1]?.total}</span>
          <span
            className={`featuredMoneyRate ${incomePerc < 0 ? "negative" : ""}`}
          >
            %{Math.abs(incomePerc)}
            {incomePerc < 0 ? (
              <ArrowDownward className="featuredIcon" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${sales[1]?.total}</span>
          <span
            className={`featuredMoneyRate ${salesPerc < 0 ? "negative" : ""}`}
          >
            %{Math.abs(salesPerc)}
            {salesPerc < 0 ? (
              <ArrowDownward className="featuredIcon" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Costs</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${costs[1]?.total}</span>
          <span
            className={`featuredMoneyRate ${costsPerc < 0 ? "negative" : ""}`}
          >
            %{Math.abs(costsPerc)}
            {costsPerc < 0 ? (
              <ArrowDownward className="featuredIcon" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
};

export default FeaturedInfo;

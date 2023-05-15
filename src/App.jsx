/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { baseService } from "./axios/baseService";
import { Table } from "antd";
import moment from "moment/moment";
import { Context } from "./context/ProductContext";
const Products = () => {
  const { orders, setOrders } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await baseService.getAll("orders");
    setOrders(data);
    setLoading(false);
    updateFilters(data);
  };

  const updateFilters = (data) => {
    const uniqueIds = [...new Set(data.map((order) => order.customerId))];
    const filterOptions = uniqueIds.map((id) => ({
      text: id,
      value: id,
    }));
    setFilters(filterOptions);
  };

  const columns = [
    {
      title: "Customer Id",
      dataIndex: "customerId",
      key: "customerId",
      filters,
      onFilter: (value, record) => record.customerId === value,
    },
    {
      title: "Freight",
      dataIndex: "freight",
      key: "freight",
      sorter: (a, b) => a.freight - b.freight,
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      sorter: (a, b) => moment(a.orderDate).unix() - moment(b.orderDate).unix(),
      render: (text) => moment(text).format("MMM Do YY"),
    },
    {
      title: "Required Date",
      dataIndex: "requiredDate",
      key: "requiredDate",
      render: (text) => moment(text).format("MMM Do YY"),
    },
    {
      title: "Shipped Date",
      dataIndex: "shippedDate",
      key: "shippedDate",
      render: (text) => moment(text).format("MMM Do YY"),
    },
    {
      title: "City",
      dataIndex: ["shipAddress", "city"],
      key: "city",
    },
    {
      title: "Country",
      dataIndex: ["shipAddress", "country"],
      key: "country",
    },
  ];
  const getRowClassName = (text) => {
    const requiredDate = moment(text.requiredDate);
    const shippedDate = moment(text.shippedDate);
    const isDelayed = requiredDate.isBefore(shippedDate);
    const rowClassName = isDelayed ? "delayed-row" : "";
    return rowClassName;
  };

  return (
    <>
      {loading && <Table loading={loading} />}
      {orders && orders.length > 0 && (
        <Table
          dataSource={orders}
          columns={columns}
          rowKey={"id"}
          rowClassName={getRowClassName}
        />
      )}
    </>
  );
};

export default Products;

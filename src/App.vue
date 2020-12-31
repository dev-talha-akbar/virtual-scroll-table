<template>
  <div id="app">
    <h1>Virtual Scroll Demo</h1>
    <data-table :cols="cols" :rows="rows" />
    <hr />
    <p>End of Table</p>
  </div>
</template>

<script>
import DataTable from "./components/DataTable/DataTable";
import faker from "faker";

export default {
  name: "App",
  components: {
    "data-table": DataTable
  },
  data() {
    const rows = new Array(20000).fill(null).map(() => ({
      name: faker.name.findName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      status: Math.random() > 0.5 ? "Confirmed" : "Unconfirmed"
    }));

    console.log(rows);

    return {
      rows,
      cols: [
        { label: "Name", key: "name", extraWidth: "32px" },
        { label: "Email", key: "email" },
        { label: "Phone Number", key: "phone" },
        { label: "Status", key: "status" }
      ]
    };
  }
};
</script>

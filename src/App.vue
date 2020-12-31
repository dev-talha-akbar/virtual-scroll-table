<template>
  <div id="app">
    <h1>Virtual Scroll Demo</h1>
    <data-table :cols="cols" :rows="rows" :summary="summary" />
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
  async created() {
    window.onresize = () => {
      this.width = window.innerWidth;
    };
  },
  data() {
    const rows = new Array(20000).fill(null).map(() => ({
      name: faker.name.findName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      address: `${faker.address.streetAddress()}, ${faker.address.zipCode()}, ${faker.address.state()}, ${faker.address.country()}`,
      status: Math.random() > 0.5 ? "Confirmed" : "Unconfirmed"
    }));

    return {
      rows,
      summary: {
        name: "Total 24 Employees",
        email: "",
        phone: "",
        address: "",
        status: "All Confirmed"
      },
      width: window.innerWidth
    };
  },
  computed: {
    cols() {
      return this.width > 768
        ? [
            { label: "Name", key: "name" },
            { label: "Email", key: "email" },
            { label: "Phone Number", key: "phone" },
            { label: "Address", key: "address", breakAt: ",", maxWidth: "2fr" },
            { label: "Status", key: "status", maxWidth: "14ch" }
          ]
        : [
            { label: "Name", key: "name" },
            { label: "Status", key: "status", maxWidth: "14ch" }
          ];
    }
  }
};
</script>

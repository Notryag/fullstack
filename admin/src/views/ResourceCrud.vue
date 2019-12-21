<template>
  <div>
    <avue-crud
      v-if='option.column'
      :data="data"
      :option="option"
      :page="page"
      @row-save="rowSave"
      @row-update="rowUpdate"
      @row-del="rowDel"
      @refresh-change="fetch"
      @on-load="changePage"
      @sort-change="changeSort"
      @search-change="search"
    ></avue-crud>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class ResourceList extends Vue {
  @Prop(String) resource: string;
  data: any = [];
  option: any = {
  };

  page: any = {
    total: 0
  };
  query: any = {
    // sort: { _id: -1 }
  };

  async fetch() {
    const res = await this.$http.get(`${this.resource}`, {
      params: {
        query: this.query
      }
    });
    this.data = res.data.data;
    this.page.total = res.data.total;
  }

  async rowSave(row, done, loading) {
    await this.$http.post(`${this.resource}`, row);
    this.$message.success("创建成功");
    this.fetch();
    done();
  }

  async rowUpdate(row, index, done, loading) {
    const data = JSON.parse(JSON.stringify(row));
    delete data.$index;
    const res = await this.$http.put(`${this.resource}/${row._id}`, data);
    console.log(res);
    this.fetch();
    done();
  }

  async rowDel(form, index) {
    await this.$confirm("是否要删除").catch();
    await this.$http.delete(`${this.resource}/${form._id}`);
    this.$message.success("删除数据成功");
    this.fetch();
  }

  changePage({ pageSize, currentPage }) {
    this.query.page = currentPage;
    this.query.limit = pageSize;
    this.fetch();
  }

  async search(where,done) {
    for (let k in where) {
      const field = this.option.column.find(v => v.prop === k);
      if (field.regex) {
        where[k] = { $regex: where[k] };
      }
    }
    this.query.where = where;
    this.fetch();
    done()
  }

  async changeSort({ prop, order }) {
    if (!order) {
      this.query.sort = null;
    } else {
      this.query.sort = {
        [prop]: order === "ascending" ? 1 : -1
      };
    }
    this.fetch();
   
  }

  async fetchOption() {
    const res = await this.$http.get(`${this.resource}/option`)
    this.option = res.data
    console.log(res.data)
  }

  created() {
    // console.log(this.resource)
    this.fetch();
    this.fetchOption()
  }
}
</script>

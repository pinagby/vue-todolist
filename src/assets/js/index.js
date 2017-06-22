import db from "../../assets/js/db.js";
import MainLayout from '../../layouts/Main.vue';
let todoDB = {
    name: 'todoList',
    version: 1,
    db: null
};

export default {
    data() {
        return {
            todoList: [],
            newTask: ""
        }
    },
    created() {
        let that = this;
        db.openDB(todoDB.name, todoDB.version, function(e) {
            todoDB.db = e.target.result;
            db.getData(todoDB.db, 'todoList', function(data) {
                that.todoList = that.sortByKey(data, 'createTime');
            });
        });

    },
    components: {
        MainLayout
    },
    methods: {
        //删除任务
        deleteTask(taskId) {
            let that = this;
            db.deleteDataByKey(todoDB.db, 'todoList', taskId, function() {
                db.getData(todoDB.db, 'todoList', function(data) {
                    that.todoList = that.sortByKey(data, 'createTime');
                });
            });

        },
        // 改变任务状态
        changeStatus(task) {
            let that = this;
            db.updateDataByKey(todoDB.db, 'todoList', task.id, function(req, store) {
                let item = req.result;
                item.complete = task.complete;
                item.completeTime = item.complete ? that.currentTime() : '';
                store.put(item);
            });
            db.getData(todoDB.db, 'todoList', function(data) {
                that.todoList = that.sortByKey(data, 'createTime');
            });
        },
        // 产生随机ID
        generateId: function() {
            return Math.floor(Math.random() * 9000) + 1000;
        },
        // 获取当前时间
        currentTime() {
            return (new Date()).toLocaleString();
        },
        // 提交新任务
        submitTask() {
            let that = this;
            if (this.newTask.trim().length <= 0) {
                alert("请填写任务名称");
                return false;
            }
            let newTask = {
                id: this.generateId(),
                name: this.newTask,
                complete: false,
                createTime: this.currentTime(),
                completeTime: ""
            }
            db.addData(todoDB.db, 'todoList', [newTask]);
            db.getData(todoDB.db, 'todoList', function(data) {
                that.todoList = that.sortByKey(data, 'createTime');
                that.newTask = '';
            });
        },
        // 根据给定键值排序
        sortByKey(data, key) {
            return data.sort(function(obj1, obj2) {
                return obj1[key] > obj2[key];
            });
        }
    },
    computed: {
        // 筛选已完成任务列表
        completeList() {
            return this.todoList.filter(function(task) {
                return task.complete;
            });
        }
    }
}

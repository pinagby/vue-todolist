<template>
  	<main-layout>
    	<div class="well">
			<h3 class="text-center">待办事项</h3>
			<ul>
				<li v-for="item in todoList" :class="['list-group-item',{'list-group-item-success':item.complete}]">
					<input type="checkbox" class="pull-left" v-model="item.complete" @click="changeStatus(item)">
					<template v-if="!item.complete">{{item.name}} </template>
					<template v-else><s>{{item.name}} &nbsp; &nbsp; <small>完成时间：{{item.completeTime}}</small></s></template>
					<div class="pull-right">
						<small>创建时间：{{item.createTime}}</small>
						<button v-on:click.prevent="deleteTask(item.id)" type="button" class="btn btn-xs close">删除</button>
					</div>
				</li>
				<li class="list-group-item">{{completeList.length}}已完成 / {{todoList.length}}总数</li>
			</ul>
			<hr>
			<form @submit.prevent="submitTask" class="form-horizontal">
				<div class="form-group">
					<label class="col-md-2 control-label">新建任务</label>
					<div class="col-md-10"><input v-model="newTask" type="text" id="task" class="form-control" placeholder="你想做点什么"></div>
				</div>
				<div class="row">
					<div class="col-md-12 text-right"><input type="submit" value="提交任务" class="btn btn-warning"></div>
				</div>
			</form>
		</div>
  	</main-layout>

</template>
<script src="../assets/js/index.js"></script>
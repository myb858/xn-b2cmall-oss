//数据字典
var dictLevel = null;
$(function() {
	//按钮权限判断
	showPermissionControl();
	
		
	//表格初始化
	queryTableData();

	//查询
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/model/price/orderPage"});
	});
	
	//录入
	$('#inputBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/logistics/product_input.htm?invoiceCode="+selRecords[0].code;
	});
	
});

//数据字典初始化
//表格初始化
function queryTableData(){
	var columns = [{
		field : '',
		title : '',
		align : 'left',
		valign : 'middle',
		checkbox : true
	}, {
		field : 'code',
		title : '订单编号',
		align : 'left',
		valign : 'middle',
		sortable : false,
	}, {
		field : 'applyUser',
		title : '下单用户',
		align : 'left',
		valign : 'middle',
		sortable : false
	},{
		field : 'totalAmount',
		title : '总金额',
		align : 'left',
		valign : 'middle',
		formatter:moneyFormatter,
		sortable : false
	},{
		field : 'applyDatetime',
		title : '下单时间',
		align : 'left',
		valign : 'middle',
		formatter:dateFormatter,
		sortable : false
	} ,{
		field : 'status',
		title : '状态',
		align : 'left',
		valign : 'middle',
		formatter:Dict.getNameForList('order_status'),
		sortable : false
	}];
	
	
	
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/model/order/Page",
		height : $(window).height() - 180,
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		queryParams : function(params) {
			return {
				code : $("#code").val(),
				applyUser : $("#applyUser").val(),
				status : 3,
				start : params.offset / params.limit + 1,
				limit : params.limit
			};
		},
		queryParamsType : 'limit',
		responseHandler : function(res) {
			return {
				rows : res.data.list,
				total : res.data.totalCount
			};
		},
		pagination : true,
		sidePagination : 'server', // 服务端请求
		totalRows : 0,
		pageNumber : 1,
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		columns : columns
	});
}



//表格时间格式转化
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}
//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}
export default (this) => {
return {
			// 音频录制 - 长按
			YinPin_LuZhi_ShouZhi_ChangAn(){
				this.PanDuan_YinPin_LuZhiZhong = "录音中...";
				this.PanDuan_YinPin_ShengBo_LuZhi_BoFang = true;
				LuYin_GuanLiQi.start();
				this.YinPinLuZhi_JiShiQi = 0;
				this.JiShiQi = setInterval(() => {
				    this.YinPinLuZhi_JiShiQi += 1;
				}, 1000);
			},
			// 音频录制 - 手机松开 - 停止录制
			YinPin_LuZhi_ShouZhi_SongKai(){
				clearInterval(this.JiShiQi)
				this.PanDuan_YinPin_LuZhiZhong = "录音结束";
				LuYin_GuanLiQi.stop();
				this.PanDuan_YinPin_ShengBo_LuZhi_BoFang = false;
			},
			// 播放录音
			DianJi_BoFang_LuYin() {
				if(this.LuYin_BenDi_DiZhi){
					this.YinPinLuZhi_JiShiQi = 0;
					this.JiShiQi = setInterval(() => {
					    this.YinPinLuZhi_JiShiQi += 1;
					}, 1000);
					this.PanDuan_YinPin_LuZhiZhong = "正在播放"
					this.PanDuan_YinPin_ShengBo_LuZhi_BoFang = true;
					FanHui_ShangXiaWen.src = this.LuYin_BenDi_DiZhi;
					FanHui_ShangXiaWen.play();
					FanHui_ShangXiaWen.onEnded(() => {
						this.PanDuan_YinPin_ShengBo_LuZhi_BoFang = false;
						this.PanDuan_YinPin_LuZhiZhong = "播放完毕";
						clearInterval(this.JiShiQi)
					})
				}else{
					this.$_XiaoXiKuang("没有录音")
				}
			},
			// 录音被打断
			YinPin_LuZhi_BeiDaDuan(){
				this.PanDuan_YinPin_LuZhiZhong = "录音结束";
				LuYin_GuanLiQi.stop();
				this.PanDuan_YinPin_ShengBo_LuZhi_BoFang = false;
			},
			// 关闭音频弹窗
			DianJi_GuanBi_YinPin_TanChuang(){
				this.PanDuan_YinPin_LuZhiZhong = "等待中...长按录音";
				this.PanDuan_YinPin_ShengBo_LuZhi_BoFang = false;
				this.PanDuan_TanChuangYinPin_LuZhi = false;
				clearInterval(this.JiShiQi)
				this.YinPinLuZhi_JiShiQi = 0;
				this.LuYin_BenDi_DiZhi = "";
				FanHui_ShangXiaWen.stop();
			},
			// 插入常用代码块的方法
			ChangYong_DaiMaKuai_FangFa(e){
				let NeiRong = e;
				this.editorCtx.insertText({
					text:NeiRong
				})
			},
			// 草稿列表 - 当前数据
			CaoGaoLieBiao_DangQianShuJu(e){
				let XiaBiao = e;
				// 获取已保存的草稿列表
				uni.getStorage({
					key: 'NeiRongCaoGao_DuoLieBiao',
					success: (res) => {
						this.DangQian_CaoGao_LieBiao_ShuLiang = res.data;
						this.NeiRongCaoGao_DuoLieBiao_NeiRong = res.data;
						this.NeiRongCaoGao_DuoLieBiao_NeiRong = this.NeiRongCaoGao_DuoLieBiao_NeiRong[XiaBiao];
						this.ZhengWen_NeiRong = this.NeiRongCaoGao_DuoLieBiao_NeiRong;
						this.editorCtx.setContents({
							html:this.ZhengWen_NeiRong
						})
					}
				});
				uni.getStorage({
					key: 'NeiRongCaoGao_DuoLieBiao',
					success: (res) => {
						this.NeiRongCaoGao_DuoLieBiao = res.data;
						this.NeiRongCaoGao_DuoLieBiao.splice(XiaBiao,1)
						uni.setStorageSync('NeiRongCaoGao_DuoLieBiao', this.NeiRongCaoGao_DuoLieBiao);
						setTimeout(()=>{
							this.DangQian_CaoGao_LieBiao_ShuLiang = this.NeiRongCaoGao_DuoLieBiao;
						},1000);
					}
				});
			},
			// 富文本编辑器相关 开始
			// 富文本编辑器editor初始化
			BianJiQi_ChuShiHua(){
				uni.createSelectorQuery().select("#editor").context((res) => {
					this.editorCtx = res.context;
					this.editorCtx.setContents({
						html:this.ZhengWen_NeiRong
					})
				})
				.exec();
			},
			// 富文本编辑器editor内容获取
			BianJiQi_NeiRong(e){
				this.ZhengWen_NeiRong = e.detail.html;
			},
			// 给editor插入东西
			DianJi_ChaRu_editor(e){
				if(e === 'JiaCu'){
					this.editorCtx.format('bold');
				}
				if(e === 'XieTi'){
					this.editorCtx.format('italic');
				}
				if(e === 'XiaHuaXian'){
					this.editorCtx.format('underline');
				}
				if(e === 'FenGeXian'){
					this.editorCtx.insertDivider();
				}
				if(e === 'KaoZuo'){
					this.editorCtx.format('align','left');
				}
				if(e === 'JuZhong'){
					this.editorCtx.format('align','center');
				}
				if(e === 'KaoYou'){
					this.editorCtx.format('align','right');
				}
			},
			DianJi_QingChu_YangShi(){
				this.$_QueDing_QuXiao(
					"注意",
					"是否清除选中内容的样式？会被格式化为<p>...</p>标签哦。",
					(res) => {
						this.editorCtx.removeFormat();
					}
				)
			},
			// 给editor插入标题
			DianJi_BiaoTi(){
				this.$_DiBu_TanChu(
					['H1','H2','H3','H4','H5','H6'],
					(res) => {
						if(res.tapIndex === 0){
							this.editorCtx.format('header', 'h1');
						}
						if(res.tapIndex === 1){
							this.editorCtx.format('header', 'h2');
						}
						if(res.tapIndex === 2){
							this.editorCtx.format('header', 'h3');
						}
						if(res.tapIndex === 3){
							this.editorCtx.format('header', 'h4');
						}
						if(res.tapIndex === 4){
							this.editorCtx.format('header', 'h5');
						}
						if(res.tapIndex === 5){
							this.editorCtx.format('header', 'h6');
						}
					}
				)
			},
			// 字体颜色弹窗 - 打开
			DianJi_YanSe(){
				this.PanDuan_TanChuangYanSe_XuanZe=true;
			},
			// 选中字体颜色
			DianJi_YanSe_XuanZhong(e){
				let YanSe = e;
				if(YanSe == "black"){
					this.editorCtx.format('color', 'black');
				}
				if(YanSe == "silver"){
					this.editorCtx.format('color', 'silver');
				}
				if(YanSe == "gray"){
					this.editorCtx.format('color', 'gray');
				}
				if(YanSe == "white"){
					this.editorCtx.format('color', 'white');
				}
				if(YanSe == "maroon"){
					this.editorCtx.format('color', 'maroon');
				}
				if(YanSe == "red"){
					this.editorCtx.format('color', 'red');
				}
				if(YanSe == "purple"){
					this.editorCtx.format('color', 'purple');
				}
				if(YanSe == "fuchsia"){
					this.editorCtx.format('color', 'fuchsia');
				}
				if(YanSe == "green"){
					this.editorCtx.format('color', 'green');
				}
				if(YanSe == "lime"){
					this.editorCtx.format('color', 'lime');
				}
				if(YanSe == "olive"){
					this.editorCtx.format('color', 'olive');
				}
				if(YanSe == "yellow"){
					this.editorCtx.format('color', 'yellow');
				}
				if(YanSe == "navy"){
					this.editorCtx.format('color', 'navy');
				}
				if(YanSe == "blue"){
					this.editorCtx.format('color', 'blue');
				}
				if(YanSe == "teal"){
					this.editorCtx.format('color', 'teal');
				}
				if(YanSe == "aqua"){
					this.editorCtx.format('color', 'aqua');
				}
				this.PanDuan_TanChuangYanSe_XuanZe = false;
			},
			// 给editor插入图片
			DianJi_ChaRu_editor_TuPian(){
				uni.chooseImage({
					sizeType:this.YaSuo_SheZhi_TuPian,
					count: 1, // 限制1次只能选择1张
					success: (res) => {
						this.$_JiaZaiZhong("图片上传中...")
						let img = res.tempFilePaths[0];
						if(this.XiTong() == "ZBlog"){
							this.TuPianShangChuan_ZBlog(img);
						}
						if(this.XiTong() == "WordPress"){
							this.TuPianShangChuan_WordPress(img);
						}
					}
				})
			},
			// 音频录制
			DianJi_YinPinLuZhi(){
				this.PanDuan_TanChuangYinPin_LuZhi = true;
			},
			// 图片上传 Z-Blog
			TuPianShangChuan_ZBlog(e){
				let TuPianURL = e;
				uni.uploadFile({
					url: this.URL() + "/zb_system/api.php?mod=upload&act=post",
					filePath: TuPianURL,
					name: "file",
					formData: {
						token: this.token().token,
					},
					success: (res) => {
						let a = JSON.parse(res.data)
						let img = a.data.upload.Url;
						this.editorCtx.insertImage({
							"src": img
						});
						uni.hideLoading();
					},
					fail: () => {
						uni.showLoading({
							title: '图片上传失败'
						});
						setTimeout(()=>{
							uni.hideLoading();
						},1000);
					}
				})
			},
			// 图片上传 WordPress
			TuPianShangChuan_WordPress(e){
				let TuPianURL = e;
				uni.uploadFile({
					url: this.URL() + "/wp-json/wp/v2/media",
					filePath: TuPianURL,
					name: "file",
					header: {
						'Authorization': 'Bearer ' + this.token().token
					},
					success: (res) => {
						let a = JSON.parse(res.data)
						let img = a.guid.rendered;
						this.editorCtx.insertImage({
							"src": img
						});
						this.$_JiaZaiZhong_GuanBi();
					},
					fail: () => {
						this.$_XiaoXiKuang("图片上传失败")
						setTimeout(()=>{
							this.$_JiaZaiZhong_GuanBi();
						},1000);
					}
				})
			},
			// 视频上传
			DianJi_ChaRu_editor_ShiPin(){
				uni.chooseVideo({
					sourceType: ['camera', 'album'],
					compressed:this.YaSuo_SheZhi_ShiPin,
					success: (res) => {
						this.ShiPinShangChuan_WordPress(res.tempFilePath)
					}
				});
			},
			// 音频上传 - WordPress
			DianJi_YinPin_ShangChuan(){
				if(this.LuYin_BenDi_DiZhi){
					this.$_JiaZaiZhong("录音上传中...")
					uni.uploadFile({
						url: this.URL() + "/wp-json/wp/v2/media",
						filePath: this.LuYin_BenDi_DiZhi,
						name: "file",
						header: {
							'Authorization': 'Bearer ' + this.token().token
						},
						success: (res) => {
							let a = JSON.parse(res.data)
							let YinPin = a.guid.rendered;
							this.YinPin = '<audio controls="controls"><source src="'+YinPin+'" type="audio/mpeg"></audio>';
							this.$_JiaZaiZhong_GuanBi();
							this.ShiFouYouYinPin = true;
							this.PanDuan_TanChuangYinPin_LuZhi = false;
							this.PanDuan_YinPin_LuZhiZhong = "等待中...长按录音";
							this.PanDuan_YinPin_ShengBo_LuZhi_BoFang = false;
							clearInterval(this.JiShiQi)
							this.YinPinLuZhi_JiShiQi = 0;
							FanHui_ShangXiaWen.stop();
						},
						fail: () => {
							this.$_XiaoXiKuang("上传失败")
							setTimeout(()=>{
								this.$_JiaZaiZhong_GuanBi();
							},1000);
						}
					})
				}else{
					this.$_XiaoXiKuang("没有录音")
				}
			},
			// 视频上传 - WordPress
			ShiPinShangChuan_WordPress(e){
				this.$_JiaZaiZhong("视频上传中...")
				let ShiPinURL = e;
				uni.uploadFile({
					url: this.URL() + "/wp-json/wp/v2/media",
					filePath: ShiPinURL,
					name: "file",
					header: {
						'Authorization': 'Bearer ' + this.token().token
					},
					success: (res) => {
						let a = JSON.parse(res.data)
						let video = a.guid.rendered;
						this.ShiPin = '<video src="'+video+'" controls="controls"></video>';
						this.$_JiaZaiZhong_GuanBi();
						this.ShiFouYouShiPin = true;
					},
					fail: () => {
						this.$_XiaoXiKuang("上传失败")
						setTimeout(()=>{
							this.$_JiaZaiZhong_GuanBi();
						},1000);
					}
				})
			},
			// 富文本编辑器相关 结束
			// 清空所有数据
			DianJi_QingKong(){
				this.$_QueDing_QuXiao(
					"提示",
					"确定要清空所有数据吗？请谨慎操作。",
					(res) => {
						// 删除内容草稿
						uni.removeStorage({
							key: 'NeiRongCaoGao'
						});
						setTimeout(()=>{
							uni.navigateBack();
						},500);
					}
				)
			},
			// 打开草稿列表页面
			DianJi_DaKai_CaoGao_LieBiao(){
				uni.setStorage({
					key: 'NeiRongCaoGao',
					data: this.ZhengWen_NeiRong + this.ShiPin + this.YinPin,
					success: () => {
						this.DaKai("X-TongYong/BianJiQi/2-CaoGao_LieBiao")
					}
				});
			},
			// 确认编辑
			DianJi_QueRen_BianJi(){
				uni.setStorage({
					key: 'NeiRongCaoGao',
					data: this.ZhengWen_NeiRong + this.ShiPin + this.YinPin,
					success: function () {
						setTimeout(()=>{
							uni.navigateBack();
						},500);
					}
				});
			},

		}
}
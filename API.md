# 接口文档

## 目录
---
#### <a href="#adminLogin">1、管理员登录</a>
#### <a href="#productList">2、获取商品列表</a>
#### <a href="#addProduct">3、添加商品</a>
#### <a href="#updateProduct">4、更新商品信息</a>
#### <a href="#deleteProduct">5、删除商品</a>
#### <a href="#categoryList">6、获取分类列表</a>
#### <a href="#addCategory">7、添加分类</a>
#### <a href="#updateCategory">8、更新分类信息</a>
#### <a href="#deleteCategory">9、删除分类</a>
#### <a href="#themeList">10、获取专题列表</a>
#### <a href="#addTheme">11、添加专题</a>
#### <a href="#updateTheme">12、更新专题信息</a>
#### <a href="#deleteTheme">13、删除专题</a>

## 接口列表
---
### <h3 id="adminLogin">1、管理员登录</h3>
#### 请求URL
`http://localhost:3000/v1/admin/login`
#### 示例
#### 请求方式
`POST`
#### 参数类型
|参数|是否必选|类型|说明|
|:-----:|:-----:|:---:|:-----       |
|username  |ture   |string  |用户名  |
|password  |true   |string  |密码    |
#### 返回示例

### <h3 id="product">2、获取商品列表</h3>
#### 请求URL
`http://localhost:3000/v1/product`
#### 示例
http://localhost:3000/v1/product?page=1&limit=20
#### 请求方式
`GET`
#### 参数类型
|参数|是否必选|类型|说明|
|:-----:|:-----:|:---:|:-----                  |
|limit  |false   |int  |每页显示的条数，默认20  |
|page   |false   |int  |请求第几页数据，默认1   |
#### 返回示例
### <h3 id="addProduct">3、添加商品</h3>
### <h3 id="updateProduct">4、更新商品信息</h3>
### <h3 id="deleteProduct">5、删除商品</h3>
### <h3 id="categoryList">6、获取分类列表</h3>
#### 请求URL
`http://localhost:3000/v1/category`
#### 示例
http://localhost:3000/v1/category
#### 请求方式
`GET`
#### 参数类型
|参数|是否必选|类型|说明|
|:-----:|:-----:|:---:|:-----                  |
### <h3 id="addCategory">7、添加分类</h3>
### <h3 id="updateCategory">8、更新分类信息</h3>
### <h3 id="deleteCategory">9、删除分类</h3>
### <h3 id="themeList">10、获取专题列表</h3>
### <h3 id="addTheme">11、添加专题</h3>
### <h3 id="updateTheme">12、更新专题信息</h3>
### <h3 id="deleteTheme">13、删除专题</h3>




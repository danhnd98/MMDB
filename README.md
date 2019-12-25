# MMDB

## Hướng dẫn cài đặt

* Cài đặt nodejs phiên bản tối thiểu 12

* Cài đặt python3

* Cài đặt các gói phần mềm python liên quan: 

	* *sklearn* `pip3 install sklearn`
	
	* *numpy* `pip3 install numpy`

	* *opencv* `pip3 install opencv-python`

	* *collections* `pip3 install collections`

	* *skimage* `pip3 install skimage`

* Tại thư mục chương trình, chạy lệnh `npm install` để cài đặt các gói thư viện của nodejs

## Hướng dẫn sử dụng

* Tại thư mục chương trình, chạy lệnh `node app.js`. Chương trình được khởi tạo và hoạt động trên cổng 3002

* Gửi api đến chương trình:

```
url: localhost:3002/uploadimage1
method: POST
header: 
	{
		content-type: "application/json"
	}
body:
	{
		"gender": <Giới tính cần truy vấn>
		"image": <Ảnh được gửi dưới dạng base64 string>
	}
```

* Kết quả trả về

```
[
	// Sản phẩm i
	{
		"_id": "5df9e93a6b993e985fc5c0de",
        	"link": <link sản phẩm>,
        	"title": <Tên sản phẩm>,
		"final_price": <Giá bán>,
		"images": [
		    {
		        "url": <Link ảnh>,
		        "path": <ĐƯờng dẫn lưu ảnh trong db>,
		        "checksum": <Mã checksum>
		    }
		]
	},
	{
		...
	}
]
```

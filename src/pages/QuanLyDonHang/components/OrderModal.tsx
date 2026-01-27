import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

interface OrderModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  danhSachSanPham: any[];
  duLieuSua?: any;
}

const OrderModal: React.FC<OrderModalProps> = ({ visible, onCancel, onSubmit, danhSachSanPham, duLieuSua }) => {
  const [form] = Form.useForm();
  const [tongTienTamTinh, setTongTienTamTinh] = useState(0);

  useEffect(() => {
    if (visible) {
      form.resetFields();
      if (duLieuSua) {
        form.setFieldsValue({
          tenKhachHang: duLieuSua.tenKhachHang,
          sdt: duLieuSua.sdt,
          diaChi: duLieuSua.diaChi,
          sanPhamChon: duLieuSua.sanPham.map((sp: any) => ({
            idSanPham: sp.idSanPham,
            soLuong: sp.soLuong
          }))
        });
        setTongTienTamTinh(duLieuSua.tongTien);
      } else {
        setTongTienTamTinh(0);
      }
    }
  }, [visible, duLieuSua, form]);

  const xuLyThayDoiForm = (_: any, allValues: any) => {
    if (allValues.sanPhamChon) {
      const tong = allValues.sanPhamChon.reduce((acc: number, item: any) => {
        const sp = danhSachSanPham.find((p: any) => p.id === item?.idSanPham);
        return acc + (sp ? sp.gia * (item?.soLuong || 0) : 0);
      }, 0);
      setTongTienTamTinh(tong);
    }
  };

  const xuLyHoanTat = (values: any) => {
    const chiTietDonHang = values.sanPhamChon.map((item: any) => {
      const sp = danhSachSanPham.find((p: any) => p.id === item.idSanPham);
      return {
        ...item,
        tenSanPham: sp.tenSanPham,
        gia: sp.gia
      };
    });
    onSubmit({ ...values, sanPham: chiTietDonHang, tongTien: tongTienTamTinh });
  };

  return (
    <Modal
      title={duLieuSua ? "Cập nhật đơn hàng" : "Tạo đơn hàng mới"}
      visible={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      width={700}
      okText={duLieuSua ? "Lưu thay đổi" : "Tạo đơn"}
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical" onFinish={xuLyHoanTat} onValuesChange={xuLyThayDoiForm}>
        <Space style={{ display: 'flex', width: '100%' }} align="start">
          <Form.Item name="tenKhachHang" label="Tên khách hàng" rules={[{ required: true, message: 'Nhập tên KH' }]} style={{ width: 300 }}>
            <Input />
          </Form.Item>
          <Form.Item name="sdt" label="Số điện thoại" rules={[{ required: true, pattern: /^\d{10,11}$/, message: 'SĐT phải 10-11 số' }]} style={{ width: 300 }}>
            <Input />
          </Form.Item>
        </Space>
        <Form.Item name="diaChi" label="Địa chỉ giao hàng" rules={[{ required: true, message: 'Nhập địa chỉ' }]}>
          <Input />
        </Form.Item>

        <Typography.Text strong>Danh sách sản phẩm:</Typography.Text>
        <Form.List name="sanPhamChon" initialValue={[{}]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, 'idSanPham']}
                    rules={[{ required: true, message: 'Chọn sản phẩm' }]}
                    style={{ width: 300 }}
                  >
                    <Select placeholder="Chọn sản phẩm">
                      {danhSachSanPham.map((sp: any) => (
                        <Select.Option key={sp.id} value={sp.id} disabled={sp.soLuong === 0}>
                          {sp.tenSanPham} (Kho: {sp.soLuong}) - {sp.gia.toLocaleString()}đ
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'soLuong']}
                    dependencies={[name, 'idSanPham']}
                    rules={[
                      { required: true, message: 'Nhập SL' },

                    ]}
                  >
                    <InputNumber placeholder="SL" min={1} />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Thêm sản phẩm khác</Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <div style={{ textAlign: 'right', fontSize: 18, fontWeight: 'bold', color: '#1890ff' }}>
          Tổng tiền: {tongTienTamTinh.toLocaleString()} đ
        </div>
      </Form>
    </Modal>
  );
};
export default OrderModal;

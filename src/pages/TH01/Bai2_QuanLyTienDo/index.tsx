import React, { useState } from 'react';
import { Tabs, Button, Card, Input, message, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useLocalStorage from '../hooks/useLocalStorage';
import { MonHoc, TienDo, MucTieu } from './type';
import { BangMonHoc } from './components/BangMonHoc';
import { ModalMonHoc } from './components/ModalMonHoc';
import { BangTienDo } from './components/BangTienDo';
import { ModalTienDo } from './components/ModalTienDo';
import { QuanLyMucTieu } from './components/QuanLyMucTieu';

const { TabPane } = Tabs;
const { Search } = Input;

const Bai2_QuanLyTienDo: React.FC = () => {
  const [dsMon, setDsMon] = useLocalStorage<MonHoc[]>('TH01_MonHoc', [
    { id: '1', tenMon: 'Toán' }, { id: '2', tenMon: 'Văn' }, { id: '3', tenMon: 'Anh' }
  ]);
  const [dsTienDo, setDsTienDo] = useLocalStorage<TienDo[]>('TH01_TienDo', []);
  const [dsMucTieu, setDsMucTieu] = useLocalStorage<MucTieu[]>('TH01_MucTieu', []);

  const [modalMonVisible, setModalMonVisible] = useState(false);
  const [editingMon, setEditingMon] = useState<MonHoc | null>(null);
  const [modalTienDoVisible, setModalTienDoVisible] = useState(false);
  const [editingTienDo, setEditingTienDo] = useState<TienDo | null>(null);
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');

  const luuMonHoc = (tenMon: string) => {
    if (editingMon) {
        const dsMoi = dsMon.map(m => m.id === editingMon.id ? { ...m, tenMon } : m);
        setDsMon(dsMoi);
        message.success('Đã cập nhật môn học!');
    } else {
        const moi: MonHoc = { id: Date.now().toString(), tenMon };
        setDsMon([...dsMon, moi]);
        message.success('Đã thêm môn mới!');
    }
    setModalMonVisible(false);
    setEditingMon(null);
  };
  const moModalSuaMon = (mon: MonHoc) => { setEditingMon(mon); setModalMonVisible(true); };
  const xoaMon = (id: string) => { setDsMon(dsMon.filter(m => m.id !== id)); message.success('Đã xóa môn học'); };

  const luuTienDo = (val: any) => {
    const duLieuForm = {
        monHocId: val.monHocId,
        thoiGian: val.thoiGian.format('YYYY-MM-DD HH:mm'),
        thoiLuong: Number(val.thoiLuong),
        noiDung: val.noiDung,
        ghiChu: val.ghiChu
    };
    if (editingTienDo) {
        const dsMoi = dsTienDo.map(td => td.id === editingTienDo.id ? { ...td, ...duLieuForm } : td);
        setDsTienDo(dsMoi);
        message.success('Đã cập nhật nhật ký!');
    } else {
        const moi: TienDo = { id: Date.now().toString(), ...duLieuForm };
        setDsTienDo([moi, ...dsTienDo]);
        message.success('Đã ghi lại tiến độ!');
    }
    setModalTienDoVisible(false);
    setEditingTienDo(null);
  };
  const moModalSuaTienDo = (item: TienDo) => { setEditingTienDo(item); setModalTienDoVisible(true); };
  const xoaTienDo = (id: string) => { setDsTienDo(dsTienDo.filter(t => t.id !== id)); message.success('Đã xóa nhật ký'); };

  const themMucTieu = (mt: MucTieu) => { setDsMucTieu([...dsMucTieu, mt]); message.success('Đã đặt mục tiêu!'); };
  const xoaMucTieu = (id: string) => { setDsMucTieu(dsMucTieu.filter(mt => mt.id !== id)); };

  const duLieuTienDoHienThi = dsTienDo.filter(item => {
     if (!tuKhoaTimKiem) return true;
     const tenMon = dsMon.find(m => m.id === item.monHocId)?.tenMon || '';
     const noiDungSearch = (item.noiDung + tenMon).toLowerCase();
     return noiDungSearch.includes(tuKhoaTimKiem.toLowerCase());
  });

  return (
    <div style={{ padding: 20 }}>
      <Row gutter={16} style={{ marginBottom: 20 }}>
          <Col span={24}>
             <QuanLyMucTieu danhSachMon={dsMon} lichSuHoc={dsTienDo} danhSachMucTieu={dsMucTieu} themMucTieu={themMucTieu} xoaMucTieu={xoaMucTieu} />
          </Col>
      </Row>

      <Card style={{boxShadow: '0 4px 12px rgba(0,0,0,0.05)'}}>
        <Tabs defaultActiveKey="2" type="card">
          <TabPane tab="Quản Lý Danh Mục Môn" key="1">
              <div style={{marginBottom: 16}}>
                 <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingMon(null); setModalMonVisible(true); }}>Thêm Danh Mục Mới</Button>
              </div>
              <BangMonHoc duLieu={dsMon} suaMon={moModalSuaMon} xoaMon={xoaMon} />
          </TabPane>

          <TabPane tab="Nhật Ký Học Tập" key="2">
              <div style={{marginBottom: 16, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10}}>
                 <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingTienDo(null); setModalTienDoVisible(true); }}>Ghi Chép Mới</Button>
                 <Search placeholder="Tìm theo môn, nội dung..." allowClear onChange={(e) => setTuKhoaTimKiem(e.target.value)} style={{ width: 300 }} />
              </div>
              <BangTienDo duLieu={duLieuTienDoHienThi} danhSachMon={dsMon} suaTienDo={moModalSuaTienDo} xoaTienDo={xoaTienDo} />
          </TabPane>
        </Tabs>
      </Card>

      <ModalMonHoc hienThi={modalMonVisible} duLieuSua={editingMon} dongModal={() => setModalMonVisible(false)} luuMon={luuMonHoc} />
      <ModalTienDo hienThi={modalTienDoVisible} duLieuSua={editingTienDo} danhSachMon={dsMon} dongModal={() => setModalTienDoVisible(false)} luuTienDo={luuTienDo} />
    </div>
  );
};

export default Bai2_QuanLyTienDo;

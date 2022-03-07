import { useState } from 'react';
import { Upload, message, Button } from 'antd';
import ImgCrop from 'antd-img-crop';
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { isBrowser } from 'umi';

const Uploads = (props: any) => {
  const { imageUrl = '' } = props;
  const [loading, setLoading] = useState(false);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  );

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setLoading(false);
    }
  };

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      onChange={handleChange}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    >
      {imageUrl ? (
        <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};
export default Uploads;

export const AvatarUplaod = (props: any) => {
  const { onOk } = props;

  let token = '';
  if (isBrowser()) {
    const tokenStr: any = localStorage.getItem('token');
    const tokenObj = JSON.parse(tokenStr);
    token = tokenObj?.access_token;
  }

  const uploadProps: any = {
    name: 'file[]',
    action: `${HOST}/api/v1/admin/assets`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
      }

      if (info.file.status === 'done') {
        const { response } = info.file;
        if (response.code === 1) {
          if (onOk) {
            onOk(response.data);
          }
          message.success('上传完成！');
          return;
        }
      }
    },
  };

  return (
    <ImgCrop rotate>
      <Upload showUploadList={false} {...uploadProps}>
        <div className="upload-button">
          <Button>
            <UploadOutlined />
            更换头像
          </Button>
        </div>
      </Upload>
    </ImgCrop>
  );
};

import * as XLSX from 'xlsx';
import type { IExcelParams } from '@/hooks/types';

// 参数为文件列表
// 因为解析 xlsx 文件是异步的，所以需要设置成异步函数
export const useExcel = async ({ files, getJSON, oldFiles }: IExcelParams) => {
  const fileList = await parseExcel(files);
  const oldFileList = await parseExcel(oldFiles);

  getJSON?.(fileList);

  // xlsx文件校验
  const validate = () => {
    if (!fileList.length || !oldFileList.length) {
      return false;
    }

    const list = fileList.filter((newFile, i) => {
      const oldFile = oldFileList[i];

      const list = newFile.filter((rowList, index) => {
        const isSame = isEqualArray(rowList, oldFile[index]);
        return !isSame;
      });

      return list.length > 0;
    });

    console.log('new file:', fileList);
    console.log('old file', oldFileList);

    return list.length === 0;
  };

  return {
    validate
  };
};

// 解析excel
export const parseExcel = async fileList => {
  const list = [];
  for (let i = 0; i < fileList.length; i++) {
    const item = await parseStream(fileList[i]);
    list.push(item);
  }
  return list;
};

// 把文件流解析成excel数据json
const parseStream = async file => {
  const fileBuffer = await readFileAsBuffer(file);
  const workbook = XLSX.read(fileBuffer, { type: 'array' });

  // 处理workbook对象，例如将其导出为JSON对象
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  return jsonData.slice(0, 2);
};

//
const readFileAsBuffer = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = event => resolve(event.target.result);
    reader.onerror = error => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

// 监测两个数组是否相同
const isEqualArray = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  if (!arr1.length || !arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
};

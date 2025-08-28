
// 文件块返回结果（用于上传块成功后返回）
export interface ChunkResult {
    id: number;
    size: number;
    created_at: number;
}

// 文件返回结果（用于上传文件成功后返回）
export interface FileResult {
    id: number;
    name: string;
    size: number;
    file_type: string;
    file_url: string;
    created_at: number;
}

// 上传文件参数类型
export interface UploadFileParams {
    file: File;
    name?: string;
    hash?: string;
}

// 上传文件请求头类型
export interface UploadFileHeaders {
    'Content-Type': string;
    'x-file-hash'?: string;
}

// 合并文件参数类型
export interface MergeFileParams {
    file_hash: string;          // 完整文件的hash值（由chunk_hashs数组计算得出）
    name: string;               // 文件名
    size: number;               // 完整文件的总大小
    file_type: string;          // 文件类型/扩展名
    chunk_hashs: string[];      // 文件块hash数组，按顺序排列
}


// 上传响应类型（根据是否传name参数返回不同类型）
export type UploadResponse<T extends UploadFileParams> = T extends { name: string }
    ? FileResult  // 传了name参数，返回完整文件信息
    : ChunkResult; // 没传name参数，返回文件块信息

/*
  Copyright (C) 2022 Suwings(https://github.com/Suwings)

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.
  
  According to the GPL, it is forbidden to delete all copyright notices, 
  and if you modify the source code, you must open source the
  modified source code.

  版权所有 (C) 2022 Suwings(https://github.com/Suwings)

  本程序为自由软件，你可以依据 GPL 的条款（第三版或者更高），再分发和/或修改它。
  该程序以具有实际用途为目的发布，但是并不包含任何担保，
  也不包含基于特定商用或健康用途的默认担保。具体细节请查看 GPL 协议。

  根据协议，您必须保留所有版权声明，如果修改源码则必须开源修改后的源码。
  前往 https://mcsmanager.com/ 申请闭源开发授权或了解更多。
*/

export const API_URL = "//" + window.location.host;

export const API_SERVICE_INSTANCES = `${API_URL}/api/service/remote_service_instances`;
export const API_SERVICE_LIST = `${API_URL}/api/service/remote_services_list`;
export const API_SERVICE = `${API_URL}/api/service/remote_services`;
export const API_SERVICE_CURD = `${API_URL}/api/service/remote_service`;
export const API_SERVICE_URL = `${API_URL}/api/service`;
export const API_FORWARD = `${API_URL}/api/service/remote_services`;

export const API_FILE_URL = `${API_URL}/api/files`;
export const API_FILE_LIST = `${API_URL}/api/files/list`;
export const API_FILE_DOWNLOAD = `${API_URL}/api/files/download/`;
export const API_FILE_UPLOAD = `${API_URL}/api/files/upload/`;
export const API_FILE_MKDIR = `${API_URL}/api/files/mkdir`;
export const API_FILE_COPY = `${API_URL}/api/files/copy`;
export const API_FILE_MOVE = `${API_URL}/api/files/move`;
export const API_FILE_COMPRESS = `${API_URL}/api/files/compress`;

export const API_USER = `${API_URL}/api/auth/`;
export const API_SEARCH = `${API_URL}/api/auth/search`;
export const API_USER_LIST = `${API_URL}/api/auth/overview`;
export const API_USER_REGISTER = `${API_URL}/api/auth/register`;
export const API_USER_LOGIN = `${API_URL}/api/auth/login`;
export const API_USER_TOKEN = `${API_URL}/api/auth/token`;
export const API_USER_LOGOUT = `${API_URL}/api/auth/logout`;
export const API_USER_DELETE = `${API_URL}/api/auth/delete`;
export const API_USER_UPDATE = `${API_URL}/api/auth/update`;
export const API_USER_API = `${API_URL}/api/auth/api`;

export const API_OVERVIEW = `${API_URL}/api/overview`;

export const API_INSTANCE = `${API_URL}/api/instance`;
export const API_INSTANCE_UPLOAD = `${API_URL}/api/instance/upload`;
export const API_INSTANCE_LOW_PERMISSION_PUT = `${API_URL}/api/protected_instance/low_permission`;
export const API_INSTANCE_OPEN = `${API_URL}/api/protected_instance/open`;
export const API_INSTANCE_STOP = `${API_URL}/api/protected_instance/stop`;
export const API_INSTANCE_KILL = `${API_URL}/api/protected_instance/kill`;
export const API_INSTANCE_REMOTE_SERVICE_STREAM = `${API_URL}/api/protected_instance/stream_channel`;
export const API_INSTANCE_UPDATE = `${API_URL}/api/protected_instance/instance_update`;
export const API_INSTANCE_RESTART = `${API_URL}/api/protected_instance/restart`;
export const API_INSTANCE_OUTPUT = `${API_URL}/api/protected_instance/outputlog`;

export const API_PROCESS_CONFIG_LIST = `${API_URL}/api/protected_instance/process_config/list`;
export const API_PROCESS_CONFIG_FILE = `${API_URL}/api/protected_instance/process_config/file`;

export const API_SCHEDULE = `${API_URL}/api/protected_schedule`;

export const API_SETTINGS = `${API_URL}/api/overview/setting`;

export const API_IMAGES = `${API_URL}/api/environment/image`;
export const API_CONTAINERS = `${API_URL}/api/environment/containers`;
export const API_PROGRESS = `${API_URL}/api/environment/progress`;

export function sleep(t) {
  return new Promise((s) => {
    setTimeout(s, t);
  });
}

// export function getSubElementDelivery(key = [], obj = {}) {

//   console.log("getSubElementDelivery:", key, "Value:", obj)
//   const title = key.shift()
//   if (key.length != 0) {
//     return getSubElementDelivery(key, obj[title]);
//   } else {
//     return obj[title];
//   }
// }

// export function setSubElementDelivery(key = [], obj = {}, val = null) {
//   const title = key.shift()
//   if (key.length != 0) {
//     setSubElementDelivery(key, obj[title]);
//   } else {
//     obj[title] = val;
//   }
// }

// export function getSubElementDelivery(key = [], obj = {}) {

//   console.log("getSubElementDelivery:", key, "Value:", obj)
//   const title = key.shift()
//   if (key.length != 0) {
//     return getSubElementDelivery(key, obj[title]);
//   } else {
//     return obj[title];
//   }
// }

export function getDescriptionByTitle(description, title = "") {
  const arr = title.split("/");
  function _exec(keys = [], _description) {
    if (!_description) return null;
    const title = keys.shift();
    if (keys.length != 0) {
      return _exec(keys, _description[title]);
    } else {
      return _description[title];
    }
  }
  return _exec(arr, description);
}

export function jsonToMap(json, topTitle = "", map = {}) {
  for (const key in json) {
    let title = null;
    if (topTitle) {
      title = `${topTitle}/${key}`;
    } else {
      title = `${key}`;
    }
    const value = json[key];
    if (value instanceof Array) {
      if (typeof value[0] === "object") {
        jsonToMap(value, title, map);
      } else {
        Object.defineProperty(map, title, {
          enumerable: true,
          configurable: true,
          get() {
            return json[key];
          },
          set(v) {
            json[key] = String(v).split(",");
          }
        });
      }
    } else if (typeof value === "object") {
      jsonToMap(value, title, map);
    } else {
      Object.defineProperty(map, title, {
        enumerable: true,
        configurable: true,
        get() {
          return json[key];
        },
        set(v) {
          json[key] = v;
        }
      });
    }
  }
  return map;
}

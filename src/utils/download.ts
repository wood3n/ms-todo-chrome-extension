import http from "@/api/request";

export function createDownloadLink(url: string, name?: string | null) {
  const link = document.createElement("a");
  link.href = url;
  link.download = name || "";
  link.target = "_blank";
  link.rel = "noreferrer noopener";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function download(url: string, name?: string | null) {
  const blob = await http.get<Blob>(url, {
    responseType: "blob",
  });

  const downloadUrl = URL.createObjectURL(blob);
  createDownloadLink(downloadUrl, name);
}

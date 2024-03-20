import { type HostAddress, isSafePort, type PortNumber } from "get-port-please";
import { createServer, type AddressInfo } from "node:net";

export function tryPort(
  port: PortNumber,
  host: HostAddress,
): Promise<PortNumber | false> {
  return new Promise((resolve) => {
    const server = createServer();
    server.unref();
    server.on("error", () => {
      resolve(false);
    });
    server.listen({ port, host }, () => {
      const { port } = server.address() as AddressInfo;
      server.close(() => {
        resolve(isSafePort(port) && port);
      });
    });
  });
}

export async function isPortAvailable(
  port: PortNumber,
  host: HostAddress,
): Promise<boolean> {
  const result = await tryPort(port, host);
  return result !== false;
}

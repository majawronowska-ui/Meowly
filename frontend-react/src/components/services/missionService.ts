import { api } from "./api";
import type { Mission } from "../../types/Mission";

class MissionService {
  async getMissions(): Promise<Mission[]> {
    return await api.get("/missions");
  }

  async getMission(id: number): Promise<Mission> {
    return await api.get(`/missions/${id}`);
  }

  async createMission(mission: Omit<Mission, "id">) {
    return await api.post("/admin/missions", mission);
  }

  async updateMission(
    id: number,
    mission: Partial<Mission>
  ) {
    return await api.put(`/admin/missions/${id}`, mission);
  }

  async deleteMission(id: number) {
    return await api.delete(`/admin/missions/${id}`);
  }

  async completeMission(id: number) {
    return await api.post(`/missions/${id}/complete`, {});
  }

  async getNearbyMissions(
    lat: number,
    lng: number
  ): Promise<Mission[]> {
    return await api.get(
      `/missions/nearby?lat=${lat}&lng=${lng}`
    );
  }

  async getUserMissions(userId: number): Promise<Mission[]> {
    return await api.get(`/users/${userId}/missions`);
  }
}

export const missionService = new MissionService();
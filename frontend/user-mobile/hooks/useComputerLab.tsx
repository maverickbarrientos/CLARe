import { getComputerLab } from "@/services/computerLabService";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from 'expo-router'
import { ComputerLab } from "@/types";

export function useComputerLab() {

  const { lab_id } = useLocalSearchParams();
  const [computerLab, setComputerLab] = useState<ComputerLab | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchComputerLab = async () => {
      try {
          const response = await getComputerLab(Number(lab_id));
          setComputerLab(response);
      } catch (error: any) {
          setError(error);
      } finally {
          setLoading(false);
      }
  }

  useEffect(() => {
      fetchComputerLab();
  }, [lab_id]);

  return { computerLab, error, loading }

}
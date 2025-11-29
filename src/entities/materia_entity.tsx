interface PlanEntity{
  codigo_plan: string
  fecha_creacion: string
  nombre_carrera: string
  plan_id:number
}

export interface MateriaEntity {
  materia_id?: number;
  plan_id: number;
  nombre: string;
  codigo_materia: string;
  nivel: number;
  plan?:PlanEntity
}
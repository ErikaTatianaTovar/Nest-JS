
export class StateValidator {
    async validateState(state: string) {
      // Validación del departamento
      const response = await fetch('https://api-colombia.com/api/v1/Department');
      const departments = await response.json();
  
      return departments.some((department) =>
        department.name.toUpperCase().includes(state.toUpperCase())
      );
    }
}
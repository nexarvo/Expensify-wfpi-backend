export class ListApiQueryDto {
    skip = 0;
    take = 10;
  
    include: string[] = null;
  
    sortBy: string = null;
  
    sortDir: 'ASC' | 'DESC' = 'ASC';
  
    searchTerm: string = null;
  
    filterBy: string = null;
  
    active: boolean = null;
  
    archive: boolean = null;
}
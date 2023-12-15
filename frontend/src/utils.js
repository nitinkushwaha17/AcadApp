export function formatDate(date){
    date = new Date(date);
    // let date_updated = new Date(post.updatedAt);
  
    return date.toDateString().substring(8, 10)+" "+date.toDateString().substring(4, 7);
    // post.dateCreated = date_created.toLocaleString('en-IN').split(', ')[1] + ", " + date_created.toDateString().substring(8, 10)+" "+date_created.toDateString().substring(4, 7);
    // post.dateUpdated = date_updated.toLocaleString('en-IN').split(', ')[1] + ", " + date_updated.toDateString().substring(8, 10)+" "+date_updated.toDateString().substring(4, 7);
}
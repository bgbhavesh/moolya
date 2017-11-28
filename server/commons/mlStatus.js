
export default MlStatusRepo = class MlStatusRepo {
  static getStatusDefinition(code, module) {
    const statusQuery = { code };
    if (module) { statusQuery.module = module }
    const status = MlStatus.findOne(statusQuery) || {};
    return status;
  }

  static updateStatus(request, code, module) {
    request = request || {};
    const status = MlStatusRepo.getStatusDefinition(code, module);
    request.status = status.code;
    request.statusDesc = status.description;
    return request;
  }
}


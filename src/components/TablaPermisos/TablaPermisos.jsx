import React from "react";
import "../../views/Administracion/Administracion.css";

const TablaPermisos = ({ datos, onView, onEdit, onUnlink, onConfirm, onCancelEdit }) => {
  const [usuarioEditando, setUsuarioEditando] = React.useState(null);
  const [nuevoCargo, setNuevoCargo] = React.useState("");
  const [nuevosPermisos, setNuevosPermisos] = React.useState("");
  const [razonPendiente, setRazonPendiente] = React.useState(null);

  return (
    <div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table
            className="table table-bordered table-striped"
            id="dataTable"
            width="100%"
            cellSpacing="0"
          >
            <thead className="custom-thead">
              <tr>
                <th className="text-center">ID</th>
                <th>Nombre usuario</th>
                <th>Cargo</th>
                <th>Permisos</th>
                <th>Status</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tfoot className="custom-thead">
              <tr>
                <th className="text-center">ID</th>
                <th>Nombre usuario</th>
                <th>Cargo</th>
                <th>Permisos</th>
                <th className="text-center">Status</th>
                <th>Acciones</th>
              </tr>
            </tfoot>
            <tbody>
              {datos.map((usuario) => (
                <tr key={usuario.id}>
                  <td className="text-center">{usuario.id}</td>
                  <td>{usuario.nombre}</td>
                  {/* Cargo */}
                  <td>
                    {usuario.id === usuarioEditando ? (
                      <select
                        className="form-select"
                        defaultValue={usuario.cargo}
                        onChange={(e) => setNuevoCargo(e.target.value)}
                      >
                        <option value="Product Owner">Product Owner</option>
                        <option value="Desarrolladora">Desarrolladora</option>
                        <option value="Diseñador UI">Diseñador UI</option>
                        <option value="Scrum Master">Scrum Master</option>
                      </select>
                    ) : (
                      usuario.cargo
                    )}
                  </td>
                  {/* Permisos */}
                  <td>
                    {usuario.id === usuarioEditando ? (
                      <select
                        className="form-select"
                        defaultValue={usuario.permisos}
                        onChange={(e) => setNuevosPermisos(e.target.value)}
                      >
                        <option value="Administrador">Administrador</option>
                        <option value="Personal">Personal</option>
                      </select>
                    ) : (
                      usuario.permisos
                    )}
                  </td>
                  {/* Status */}
                  <td className="text-start align-middle ps-4">
                    <span className={`status-pill ${usuario.status.toLowerCase()}`}>
                      {usuario.status}
                    </span>
                  </td>
                  {/* Acciones */}
                  <td style={{ gap: "20px" }}>
                    <div className="d-flex align-items-center gap-3">
                      <div className="action-button-container">
                        <button
                          className="btn-icon-plain"
                          onClick={() => onView(usuario.id)}
                        >
                          <i className="bi bi-eye text-muted"></i>
                        </button>
                        <button
                          className="btn-icon-plain"
                          onClick={() => {
                            if (usuarioEditando === usuario.id) {
                              // Si ya está en modo edición, cancelar todo
                              onCancelEdit(usuario.id); // Restaurar estado original
                              setUsuarioEditando(null);
                            } else {
                              // Guardar datos originales antes de editar
                              onChangeStatus(usuario.id, "Editando");
                              setNuevoCargo(usuario.cargo);
                              setNuevosPermisos(usuario.permisos);
                              setUsuarioEditando(usuario.id);
                              setRazonPendiente("editar");
                              onEdit(usuario.id, {
                                ...usuario,
                                status: "Editando",
                              });
                            }
                          }}
                        >
                          <i className="bi bi-pencil-square text-muted"></i>
                        </button>
                      </div>

                      {/* Modo edición */}
                      {usuario.id === usuarioEditando ? (
                        <>
                          {/* Botón Guardar (verde) */}
                          <button
                            type="button"
                            className="btn btn-icon"
                            style={{
                              color: "#5abd5a",
                              height: "38px",
                              width: "38px",
                            }}
                            onClick={() => {
                              if (!nuevoCargo || !nuevosPermisos) {
                                alert("Todos los campos son obligatorios.");
                                return;
                              }
                              // Guardar cambios y cambiar estado a Confirmado
                              onEdit(usuario.id, {
                                cargo: nuevoCargo,
                                permisos: nuevosPermisos,
                                status: "Confirmado",
                              });
                              setUsuarioEditando(null); // Salir del modo edición
                              setRazonPendiente(null);
                            }}
                          >
                            <i className="bi bi-check-square-fill"></i>
                          </button>
                          {/* Botón Cancelar (rojo) */}
                          <button
                            type="button"
                            className="btn btn-icon"
                            style={{
                              color: "#fb4343",
                              height: "38px",
                              width: "38px",
                            }}
                            onClick={() => {
                              // Restaurar datos originales y cambiar estado a Confirmado
                              onCancelEdit(usuario.id);
                              onEdit(usuario.id, {
                                cargo: usuario.cargo,
                                permisos: usuario.permisos,
                                status: "Confirmado",
                              });
                              setUsuarioEditando(null); // Salir del modo edición
                              setRazonPendiente(null);
                            }}
                          >
                            <i className="bi bi-x-square-fill"></i>
                          </button>
                        </>
                      ) : (
                        <>
                          {/* Botones para Pendiente */}
                          {usuario.status === "Pendiente" && (
                            <>
                              {/* Botón Confirmar (verde) */}
                              <button
                                type="button"
                                className="btn btn-icon"
                                style={{
                                  color: "#5abd5a",
                                  height: "38px",
                                  width: "38px",
                                }}
                                onClick={() => {
                                  if (razonPendiente === "editar") {
                                    // Confirmar cambios de edición
                                    onEdit(usuario.id, {
                                      cargo: nuevoCargo,
                                      permisos: nuevosPermisos,
                                      status: "Confirmado",
                                    });
                                  } else {
                                    // Confirmar usuario
                                    onConfirm(usuario.id);
                                  }
                                }}
                              >
                                <i className="bi bi-check-square-fill"></i>
                              </button>
                              {/* Botón Desvincular (rojo) */}
                              <button
                                type="button"
                                className="btn btn-icon"
                                style={{
                                  color: "#fb4343",
                                  height: "38px",
                                  width: "38px",
                                }}
                                onClick={() => {
                                  if (razonPendiente === "editar") {
                                    // Cancelar edición y cambiar estado a Confirmado
                                    onCancelEdit(usuario.id);
                                    onEdit(usuario.id, {
                                      cargo: usuario.cargo,
                                      permisos: usuario.permisos,
                                      status: "Confirmado",
                                    });
                                  } else {
                                    // Desvincular usuario
                                    onUnlink(usuario.id);
                                  }
                                }}
                              >
                                <i className="bi bi-x-square-fill"></i>
                              </button>
                            </>
                          )}

                          {/* Botón Desvincular */}
                          {usuario.status === "Confirmado" && (
                            <button
                              type="button"
                              className="btn btn-danger"
                              style={{
                                height: "38px",
                              }}
                              onClick={() => {
                                if (window.confirm("¿Está seguro de desvincular este usuario?")) {
                                  onUnlink(usuario.id);
                                }
                              }}
                            >
                              DESVINCULAR
                            </button>
                          )}

                          {/* Botón Vincular */}
                          {usuario.status === "Desvinculado" && (
                            <button
                              type="button"
                              className="btn btn-primary"
                              style={{
                                height: "38px",
                              }}
                              onClick={() => onConfirm(usuario.id)}
                            >
                              VINCULAR
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TablaPermisos;
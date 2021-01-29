import { CCol, CRow } from "@coreui/react";
import { memo, useCallback, useContext, useRef } from "react";
import { HelpModal } from "./HelpModal";
import { CompanionContext, socketEmit } from "../util";
import { InstancesList } from "./InstanceList";
import { AddInstancesPanel } from "./AddModule";
import { InstanceEditModal } from "./InstanceEditModal";

export const InstancesPage = memo(function InstancesPage() {
	const context = useContext(CompanionContext)

	const helpModalRef = useRef()
	const editModalRef = useRef()

	const showHelp = useCallback((name) => {
		socketEmit(context.socket, 'instance_get_help', [name]).then(([err, result]) => {
			if (err) {
				alert('Error getting help text');
				return;
			}
			if (result) {
				helpModalRef.current?.show(name, result)
			}
		})
	}, [context.socket])

	const doConfigureInstance = useCallback((id) => {
		editModalRef.current.show(id)
	}, [])

	return (
		<CRow className='instances-page'>
			<HelpModal ref={helpModalRef} />

			<InstanceEditModal ref={editModalRef} />

			<CCol xl={6} className='instances-panel'>
				<InstancesList showHelp={showHelp} doConfigureInstance={doConfigureInstance} />
			</CCol>
			<CCol xl={6} className='instances-panel'>
				<AddInstancesPanel showHelp={showHelp} doConfigureInstance={doConfigureInstance} />
			</CCol>
		</CRow>
	)
})